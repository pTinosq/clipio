const Fuse = require("fuse.js");
import Tag from "./tag_search/Tag.js";
import TagGroup from "./tag_search/TagGroup.js";
import tagColors from "./tag_search/tagColors.js";

const tags = [
  new Tag("development", tagColors.Blue),
  new Tag("design", tagColors.Green),
  new Tag("conversion", tagColors.Grey),
  new Tag("web", tagColors.Purple),
  new Tag("funny", tagColors.Red),
  new Tag("cryptography", tagColors.Teal),
  new Tag("finance", tagColors.Yellow),
];

document.addEventListener("DOMContentLoaded", function () {
  const tagGroup = new TagGroup("meh-filter-tags");

  document
    .getElementById("meh-tag-search-input")
    .addEventListener("input", function () {
      const searchInput = document.getElementById("meh-tag-search-input").value;
      const searchResults = document.getElementById("meh-tag-search-results");

      const options = {
        includeScore: true,
        threshold: 0.3,
        keys: ["name"],
      };

      const fuse = new Fuse(tags, options);

      const results = fuse.search(searchInput);

      searchResults.innerHTML = "";

      results.forEach((result) => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("meh-tag-search-result");
        resultElement.dataset.tag = result.item.name;

        const resultText = document.createElement("span");

        resultText.innerHTML = result.item.name;
        resultElement.appendChild(resultText);

        searchResults.appendChild(resultElement);
      });
    });

  let selectedElementIndex = -1;

  document
    .getElementById("meh-tag-search-input")
    .addEventListener("keydown", function (e) {
      const searchResults = document.getElementById("meh-tag-search-results");
      const searchResultElements = searchResults.getElementsByClassName(
        "meh-tag-search-result"
      );

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

        const searchInput = document.getElementById("meh-tag-search-input");
        searchInput.value = "";
        searchResults.innerHTML = "";

        const tag = new Tag(selectedTag);
        tagGroup.addTag(tag.buildHTML());

        selectedElementIndex = -1;
      } else {
        selectedElementIndex = -1;
      }

      if (
        selectedElementIndex >= 0 &&
        selectedElementIndex < searchResultElements.length
      ) {
        for (let i = 0; i < searchResultElements.length; i++) {
          searchResultElements[i].classList.remove(
            "meh-tag-search-result-active"
          );
        }

        searchResultElements[selectedElementIndex].classList.add(
          "meh-tag-search-result-active"
        );
      }
    });
});
