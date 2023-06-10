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
replaceValueInputElement.placeholder = "Replace...";
replaceValueInputElement.id = "replace-value-input";

replaceValueInput.element = replaceValueInputElement;

// Replace with input
const replaceWithInput = new InteractorElement();
const replaceWithInputElement = document.createElement("input");
replaceWithInputElement.type = "text";
replaceWithInputElement.placeholder = "Replace with...";
replaceWithInputElement.id = "replace-with-input";

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

textReplaceInteractor.titleElements = [title];
textReplaceInteractor.contentElements = [replaceValueInput, replaceWithInput];

export default textReplaceInteractor;
