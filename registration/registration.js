  function validateForm() {
    var name = document.getElementById("name").value.trim();
    var age = document.getElementById("age").value;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var birthday = document.getElementById("birthday").value;

    var errorText = document.getElementById("errorText");

    // Validation checks
    if (name === "") {
      errorText.textContent = "Please enter your name.";
      return false;
    }

    if (isNaN(age) || age <= 0) {
      errorText.textContent = "Please enter a valid age.";
      return false;
    }

    // Validate height in feet and inches format
    if (!validateHeight(height)) {
      errorText.textContent = "Please enter a valid height in feet and inches.";
      return false;
    }

    if (isNaN(weight) || weight <= 0) {
      errorText.textContent = "Please enter a valid weight.";
      return false;
    }

    if (birthday === "") {
      errorText.textContent = "Please select your birthday.";
      return false;
    }

    // Clear any previous error messages
    errorText.textContent = "";

    // If all validations pass, form can be submitted
    return true;
  }

  function validateHeight(height) {
    // Regular expression to match the format "feet inches"
    var regex = /^(\d+)\s(feet)?\s(\d+)\s(inches)?$/i;
    return regex.test(height.trim());
  }
