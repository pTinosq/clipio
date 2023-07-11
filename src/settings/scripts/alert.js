document.addEventListener("DOMContentLoaded", function () {
  // Not a big fan of this code but it works for now

  const alertBoxes = document.getElementsByClassName("alert");
  for (let i = 0; i < alertBoxes.length; i++) {
    const alertBox = alertBoxes[i];

    // Add a click event listener to the alert box
    alertBox.firstElementChild.addEventListener("click", function () {
      hideAlert();
    });

    alertBox.lastElementChild.addEventListener("click", function () {
      showAlert();
    });
  }
});

function hideAlert(alertBox) {
  alertBox.firstElementChild.style.display = "none";
  alertBox.lastElementChild.style.display = "block";
}

function showAlert(alertBox) {
  alertBox.firstElementChild.style.display = "block";
  alertBox.lastElementChild.style.display = "none";
}

module.exports = {
  hideAlert,
  showAlert,
};
