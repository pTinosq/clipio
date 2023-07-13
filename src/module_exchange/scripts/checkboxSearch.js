import { searchFilter } from "./searchFilter.js";

const CHECKBOXES = [
  "meh-verified-switch",
  "meh-installed-switch",
  "meh-uninstalled-switch",
  "meh-enabled-switch",
  "meh-disabled-switch",
];

function createCheckboxFilter(checkboxElement) {
  let checkboxFilters = {};
  CHECKBOXES.forEach((checkbox) => {
    const checkboxElement = document.getElementById(checkbox);
    checkboxFilters[checkbox] = checkboxElement.checked;
  });

  return checkboxFilters;
}

document.addEventListener("DOMContentLoaded", function () {

  CHECKBOXES.forEach((checkbox) => {
    const checkboxElement = document.getElementById(checkbox);
    checkboxElement.addEventListener("change", function (event) {
      const checkboxFilters = createCheckboxFilter(checkboxElement);
      searchFilter.addFilter("checkbox", checkboxFilters);
      searchFilter.applyFilters();
    });
  });
});
