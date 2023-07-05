const Fuse = require("fuse.js");

const tags = [
  "development",
  "design",
  "conversion",
  "web",
  "funny",
  "cryptography",
  "finance",
  "math",
];

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("meh-search-input")
    .addEventListener("input", function () {
      const searchInput = document.getElementById("meh-search-input").value;
      const searchResults = document.getElementById("meh-search-results");

      const options = {
        includeScore: true,
        threshold: 0.3,
      };

      const fuse = new Fuse(tags, options);

      const results = fuse.search(searchInput);

      searchResults.innerHTML = "";

      results.forEach((result) => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("meh-search-result");
        resultElement.dataset.tag = result.item;

        const resultText = document.createElement("span");

        resultText.innerHTML = result.item;
        resultElement.appendChild(resultText);

        searchResults.appendChild(resultElement);
      });
    });

  let selectedElementIndex = -1;

  document
    .getElementById("meh-search-input")
    .addEventListener("keydown", function (e) {
      const searchResults = document.getElementById("meh-search-results");
      const searchResultElements =
        searchResults.getElementsByClassName("meh-search-result");

      if (e.key == "ArrowDown" && searchResultElements.length > 0) {
        selectedElementIndex++;

        if (selectedElementIndex >= searchResultElements.length) {
          selectedElementIndex = 0;
        }
      } else if (e.key == "ArrowUp" && searchResultElements.length > 0) {
        selectedElementIndex--;

        if (selectedElementIndex < 0) {
          selectedElementIndex = searchResultElements.length - 1;
        }
      } else if (e.key == "Enter" && selectedElementIndex >= 0) {
        const selectedElement = searchResultElements[selectedElementIndex];
        const selectedTag = selectedElement.dataset.tag;

        const searchInput = document.getElementById("meh-search-input");
        searchInput.value = selectedTag;

        searchResults.innerHTML = "";
        selectedElementIndex = -1;
      } else {
        selectedElementIndex = -1;
      }

      if (
        selectedElementIndex >= 0 &&
        selectedElementIndex < searchResultElements.length
      ) {
        for (let i = 0; i < searchResultElements.length; i++) {
          searchResultElements[i].classList.remove("meh-search-result-active");
        }

        searchResultElements[selectedElementIndex].classList.add(
          "meh-search-result-active"
        );
      }
    });
});
