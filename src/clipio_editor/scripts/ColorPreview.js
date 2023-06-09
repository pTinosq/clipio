export class ColorPreview {
  buildHTML(color) {
    const informationContent = document.getElementById("information-content");
    const detectedColor = document.createElement("p");
    detectedColor.innerHTML = "Detected colour: ";

    var color_display = document.createElement("div");
    color_display.className = "color-display";
    color_display.style = `background: ${color}`;
    informationContent.appendChild(detectedColor);
    informationContent.appendChild(color_display);
  }
}
