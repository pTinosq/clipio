// Import the functions we want to test
import { hideAlert, showAlert } from "../../src/settings/scripts/alert";

// Define the alertBox variable
const alertBox = document.createElement("div");
const firstElementChild = document.createElement("div");
const lastElementChild = document.createElement("div");
alertBox.appendChild(firstElementChild);
alertBox.appendChild(lastElementChild);

// Test the hideAlert function
test("hideAlert should hide the first element child and show the last element child", () => {
  // Set the initial state of the alert box
  firstElementChild.style.display = "block";
  lastElementChild.style.display = "none";

  // Call the hideAlert function
  hideAlert(alertBox);

  // Check that the first element child is hidden and the last element child is shown
  expect(firstElementChild.style.display).toBe("none");
  expect(lastElementChild.style.display).toBe("block");
});

// Test the showAlert function
test("showAlert should show the first element child and hide the last element child", () => {
  // Set the initial state of the alert box
  firstElementChild.style.display = "none";
  lastElementChild.style.display = "block";

  // Call the showAlert function
  showAlert(alertBox);

  // Check that the first element child is shown and the last element child is hidden
  expect(firstElementChild.style.display).toBe("block");
  expect(lastElementChild.style.display).toBe("none");
});
