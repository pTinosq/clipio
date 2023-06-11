export class ColorPreview {
  buildHTML(color) {
    const detectedColor = document.createElement("p");
    detectedColor.innerHTML = "Detected colour: ";

    var colorDisplay = document.createElement("div");
    colorDisplay.className = "color-display";
    colorDisplay.style = `background: ${color}`;

    return [detectedColor, colorDisplay];
  }
}
