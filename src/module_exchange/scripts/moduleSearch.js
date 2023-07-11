import { searchFilter } from "./searchFilter.js";

function filterByTitleDescription(filterString) {
  searchFilter.addFilter("title", filterString);
  searchFilter.addFilter("description", filterString);
  searchFilter.applyFilters();
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
