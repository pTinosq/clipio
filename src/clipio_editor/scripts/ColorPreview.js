export class ColorPreview {
  constructor() {
    this.color = "#000000";
  }

  buildHTML(color) {
    //TODO: Make this work
    let detected_color_text = document.createElement("p");
    detected_color_text.innerHTML = "Detected color:";

    var color_display = document.createElement("div");
    color_display.className = "color-display";
    color_display.style = `background: ${color}`;

    var color_display_text = document.createElement("p");
    color_display.innerHTML = getHexColour(localStorage.getItem("clipboard"));

    color_display.appendChild(colour_display_p);

    if (getHexColour(localStorage.getItem("clipboard")) !== false) {
      document
        .getElementById("information-content")
        .appendChild(detected_color_text);
      document.getElementById("information-content").appendChild(color_display);
    }
  }
}
