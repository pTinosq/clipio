import { Interactor, InteractorElement } from "../Interactor.js";

class TextReplaceInteractor extends Interactor {
  constructor(run, title) {
    super(run);
    this.title = title;
  }
}

const textReplaceInteractor = new TextReplaceInteractor();

// Title
const title = new InteractorElement();
const titleElement = document.createElement("h1");
titleElement.innerHTML = "Replace";

title.isClickable = true;
title.element = titleElement;

// Replace value input
const replaceValueInput = new InteractorElement();
const replaceValueInputElement = document.createElement("input");
replaceValueInputElement.type = "text";
replaceValueInputElement.placeholder = "Find this...";
replaceValueInputElement.id = "replace-value-input";
replaceValueInputElement.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    textReplaceInteractor.onClick();
  }
});

replaceValueInput.element = replaceValueInputElement;

// Break
const breakElement = new InteractorElement();

breakElement.element = document.createElement("br");

// Replace with input
const replaceWithInput = new InteractorElement();
const replaceWithInputElement = document.createElement("input");
replaceWithInputElement.type = "text";
replaceWithInputElement.placeholder = "Replace with...";
replaceWithInputElement.id = "replace-with-input";
replaceWithInputElement.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    textReplaceInteractor.onClick();
  }
});

replaceWithInput.element = replaceWithInputElement;

// Run method
textReplaceInteractor.run = (clipboardContent) => {
  const replaceValue = document.getElementById("replace-value-input").value;
  const replaceWith = document.getElementById("replace-with-input").value;

  const replacedContent = clipboardContent.replaceAll(
    replaceValue,
    replaceWith
  );

  return replacedContent;
};

// Add elements to interactor
textReplaceInteractor.titleElements = [title];
textReplaceInteractor.contentElements = [
  replaceValueInput,
  breakElement,
  replaceWithInput,
];

export default textReplaceInteractor;
