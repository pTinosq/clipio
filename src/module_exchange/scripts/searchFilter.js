import ModuleExchangeItem from "./ModuleExchangeItem.js";

class SearchFilter {
  constructor() {
    this.filters = {
      tag: [],
      title: "",
      description: "",
      checkbox: {},
    };
  }

  addFilter(filterKey, value) {
    this.filters[filterKey] = value;
  }

  applyFilters() {
    // Get all modules
    const moduleExchangeBody = document.getElementById("module-exchange-body");
    const moduleElements = moduleExchangeBody.children;

    const modules = [];

    for (let i = 0; i < moduleElements.length; i++) {
      let m = new ModuleExchangeItem();
      m.fromHTML(moduleElements[i]);
      modules.push(m);
    }
    


    // Filter by tag
    let tagFilteredModules = modules;
    if (this.filters.tag.length > 0) {
      tagFilteredModules = [];
      for (let i = 0; i < modules.length; i++) {
        let moduleTags = modules[i].tags;
        let tags = this.filters.tag;

        if (tags.every((tag) => moduleTags.map((m) => m.name).includes(tag))) {
          tagFilteredModules.push(modules[i]);
        }
      }
    }

    console.log(tagFilteredModules);

    // Filter by checkbox
    let checkboxFilteredModules = tagFilteredModules;
    if (Object.keys(this.filters.checkbox).length > 0) {
      checkboxFilteredModules = [];
      console.log(this.filters.checkbox);
      for (let i = 0; i < tagFilteredModules.length; i++) {
        let module = tagFilteredModules[i];
        let checkboxFilters = this.filters.checkbox;

        // Apply each check until one fails with the module
        let passed = true;

        if (checkboxFilters["meh-verified-switch"] && !module.verified && passed) {
          passed = false;
        } 

        if (!checkboxFilters["meh-installed-switch"] && module.installed && passed) {
          passed = false;
        }

        if (!checkboxFilters["meh-uninstalled-switch"] && !module.installed && passed) {
          passed = false;
        }

        if (!checkboxFilters["meh-enabled-switch"] && module.enabled && module.installed && passed) {
          passed = false;
        }

        if (!checkboxFilters["meh-disabled-switch"] && !module.enabled && module.installed && passed) {
          passed = false;
        }

        if (passed) {
          checkboxFilteredModules.push(module);
        }
      }
    }

    // Filter by title and description
    let titleFilteredModules = checkboxFilteredModules;
    if (this.filters.title !== "") {
      titleFilteredModules = [];
      for (let i = 0; i < checkboxFilteredModules.length; i++) {
        if (
          checkboxFilteredModules[i].name
            .toLowerCase()
            .includes(this.filters.title.toLowerCase()) ||
            checkboxFilteredModules[i].description
            .toLowerCase()
            .includes(this.filters.title.toLowerCase())
        ) {
          titleFilteredModules.push(checkboxFilteredModules[i]);
        }
      }
    }

    for (let i = 0; i < moduleElements.length; i++) {
      moduleElements[i].classList.add("hidden");

      for (let j = 0; j < titleFilteredModules.length; j++) {
        if (moduleElements[i].id === titleFilteredModules[j].uid) {
          moduleElements[i].classList.remove("hidden");
        }
      }
    }

    if (titleFilteredModules.length === 0) {
      document.getElementById("no-modules-found").classList.remove("hidden");
    } else {
      document.getElementById("no-modules-found").classList.add("hidden");
    }
  }
}

// Singleton instance of SearchFilter class
const searchFilter = new SearchFilter();

// Export the searchFilter instance
export { searchFilter };
