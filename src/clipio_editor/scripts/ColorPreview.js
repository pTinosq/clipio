export class ColorPreview {
  buildHTML(colors) {
    const detectedColor = document.createElement("p");
    if (colors.length > 1) {
      detectedColor.innerHTML = "Detected colours: ";
    } else {
      detectedColor.innerHTML = "Detected colour: ";
    }

    const colorDisplays = document.createElement("div");

    for (let i = 0; i < colors.length; i++) {
      let colorDisplay = document.createElement("div");
      colorDisplay.className = "color-display";
      colorDisplay.style = `background: ${colors[i]}`;

      colorDisplays.appendChild(colorDisplay);
    }

    return [detectedColor, colorDisplays];
  }
}
