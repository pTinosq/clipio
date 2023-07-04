import errorDialog from "./errorDialog.js";

class invalidTokenDialog extends errorDialog {
  constructor(id) {
    super(id);
    this.title = "Invalid GitHub Token";
    this.message =
      "The GitHub token you have entered is invalid. Please check your token and try again.";
    this.buttons = [];
  }

  addButton(text, callback) {
    super.addButton(text, callback);
  }
}

export default invalidTokenDialog;
