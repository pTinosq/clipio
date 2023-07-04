export default class errorDialog {
  constructor(id) {
    this.id = id;
    this.title = "Error";
    this.message = "An error has occurred";
    this.buttons = [
      {
        text: "OK",
        action: () => {
          document.getElementById(this.id).close();
        },
      },
    ];
  }

  addButton(text, callback) {
    this.buttons.push({
      text: text,
      action: callback,
    });
  }

  show() {
    // Set dialog title and message
    document.getElementById("errorDialogTitle").innerText = this.title;
    document.getElementById("errorDialogMessage").innerText = this.message;

    // Set dialog buttons
    let buttonsHTML = document.getElementById("errorDialogButtons");
    buttonsHTML.innerHTML = "";

    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[i];
      let buttonHTML = document.createElement("button");
      buttonHTML.innerText = button.text;
      buttonHTML.addEventListener("click", button.action);
      buttonsHTML.appendChild(buttonHTML);
    }

    // Show dialog
    document.getElementById(this.id).showModal();
  }
}
