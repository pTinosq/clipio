import errorDialog from "./errorDialog.js";

class noInternetDialog extends errorDialog {
  constructor(id) {
    super(id);
    this.title = "No Internet Connection";
    this.message =
      "You need to be connected to the internet to use the module exchange.";
    this.buttons = [];
  }

  addButton(text, callback) {
    super.addButton(text, callback);
  }
}

export default noInternetDialog;
