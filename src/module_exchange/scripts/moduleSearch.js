function filterByTitleDescription(filterString) {
  const modules = document.getElementById("module-exchange-body");

  for (const module of modules.children) {
    const title = module.querySelector(".mebi-title").innerText.toLowerCase();
    const description = module
      .querySelector(".mebi-description")
      .innerText.toLowerCase();

    if (title.includes(filterString) || description.includes(filterString)) {
      module.style.display = "block";
    } else {
      module.style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("meh-module-search-input");

  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Escape") {
      searchInput.value = "";
      return;
    }

    const searchValue = searchInput.value.toLowerCase();
    filterByTitleDescription(searchValue);
  });
});
