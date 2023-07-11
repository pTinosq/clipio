import ModuleExchangeItem from "./ModuleExchangeItem.js";

class SearchFilter {
  constructor() {
    this.filters = {
      tags: [],
      title: "",
      description: "",
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

    // Filter by tag first

    // if (tags.every((tag) => moduleTags.includes(tag))) {
    let tagFilteredModules = modules;

    if (this.filters.tags.length > 0) {
      tagFilteredModules = [];
      for (let i = 0; i < modules.length; i++) {
        let moduleTags = modules[i].tags;
        let tags = this.filters.tags;

        if (tags.every((tag) => moduleTags.map((m) => m.name).includes(tag))) {
          tagFilteredModules.push(modules[i]);
        }
      }
    }

    // Filter by title and description
    let titleFilteredModules = tagFilteredModules;
    if (this.filters.title !== "") {
      titleFilteredModules = [];
      for (let i = 0; i < tagFilteredModules.length; i++) {
        if (
          tagFilteredModules[i].name
            .toLowerCase()
            .includes(this.filters.title.toLowerCase()) ||
          tagFilteredModules[i].description
            .toLowerCase()
            .includes(this.filters.title.toLowerCase())
        ) {
          titleFilteredModules.push(tagFilteredModules[i]);
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
  }
}

// Singleton instance of SearchFilter class
const searchFilter = new SearchFilter();

// Export the searchFilter instance
export { searchFilter };
