const Fuse = require("fuse.js");
import TagGroup from "./tags/TagGroup.js";
import tags from "./tags/tags.js";

function filterByTags(tags) {
  const modules = document.getElementById("module-exchange-body");

  for (let i = 0; i < modules.children.length; i++) {
    let module = modules.children[i];
    const moduleTags = module.dataset.tags.split(",");

    // Only show modules that have all the tags
    if (tags.every((tag) => moduleTags.includes(tag))) {
      module.style.display = "block";
    }
    // Hide modules that don't have all the tags
    else {
      module.style.display = "none";
    }
  }
}

function addTagFromSearch(tag, tagGroup) {
  return () => {
    let selectedTag = new tags[tag]();

    const searchInput = document.getElementById("meh-tag-search-input");
    const searchResults = document.getElementById("meh-tag-search-results");
    searchInput.value = "";
    searchResults.innerHTML = "";

    if (!tagGroup.containsTag(selectedTag)) {
      tagGroup.addTag(selectedTag);
      tagGroup.updateHTML(tagGroup.id);
      filterByTags(tagGroup.tags.map((tag) => tag.name));
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const tagGroup = new TagGroup("meh-filter-tags");
  tagGroup.onUpdateCallback = () => {
    filterByTags(tagGroup.tags.map((tag) => tag.name));
  };

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

      const searchTags = [
        new tags.conversion(),
        new tags.cryptography(),
        new tags.design(),
        new tags.development(),
        new tags.finance(),
        new tags.formatting(),
        new tags.funny(),
        new tags.web(),
      ];

      const fuse = new Fuse(searchTags, options);

      const results = fuse.search(searchInput);

      searchResults.innerHTML = "";

      results.forEach((result) => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("meh-tag-search-result");
        resultElement.dataset.tag = result.item.name;

        const resultText = document.createElement("span");

        resultText.innerHTML = result.item.name;

        resultElement.addEventListener(
          "click",
          addTagFromSearch(result.item.name, tagGroup)
        );

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
        let selectedTag = selectedElement.dataset.tag;
        
        addTagFromSearch(selectedTag, tagGroup)();

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
