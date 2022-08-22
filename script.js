//selecting inputs
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password-confirm");

//selecting form
const form = document.getElementById("form1");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateFirstName();
  validateLastName();
  validatePassword();
  validatePasswordConfirm();
  validateEmail();
});

//Error message
const setError = (field, message) => {
  field.style.borderColor = "red";
  field.nextElementSibling.classList.add("error");
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = "red";
};

//green border
const setGreen = (field) => {
  field.nextElementSibling.classList.remove("error");
  field.nextElementSibling.innerHTML = "";
  field.style.borderColor = "green";
};

//validatin inputs
function validateFirstName() {
  //empty check
  if (checkIfEmpty(firstName)) return;
  //if only letters
  if (checkIfOnlyLetters(firstName)) return;
}

function validateLastName() {
  //emptycheck
  if (checkIfEmpty(lastName)) return;
  //if only letters
  if (checkIfOnlyLetters(lastName)) return;
}

function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email, 5)) return;
}

function validatePassword() {
  //empty check
  if (checkIfEmpty(password)) return;
  //min-max length check
  if (!meetLength(password, 8, 50)) return;
  //if matches Regex
  if (containsCharacters(password, 4)) return;
}

function validatePasswordConfirm() {
  //empty check
  if (checkIfEmpty(confirmPassword)) return;
  //if they do not  match
  if (password.value !== confirmPassword.value) {
    setError(confirmPassword, `${confirmPassword.name} do not match `);
    return;
  } else {
    setGreen(confirmPassword);
    return true;
  }
}

function checkIfEmpty(field) {
  if (field.value.trim() === "") {
    setError(field, `${field.name} cannot be empty`);
    return true;
  } else {
    setGreen(field);
    return false;
  }
}

function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setGreen(field);
    return true;
  } else {
    setError(field, `${field.name} must contain only letters`);
    return false;
  }
}

function meetLength(field, minLength, maxLength) {
  if (field.value.length >= minLength && field.value.length <= maxLength) {
    setGreen(field);
    return true;
  } else if (field.value.length < minLength) {
    setError(
      field,
      `${field.name} must be at least ${minLength} characters long`
    );
    return false;
  } else if (field.value.length > maxLength) {
    setError(
      field,
      `${field.name} must be shorter than ${maxLength} character`
    );
    return false;
  }
}

function containsCharacters(field, code) {
  let regEx;
  switch (code) {
    case 1:
      // letters
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, "Must contain at least one letter");
    case 2:
      // letter and numbers
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one letter and one number"
      );
    case 3:
      // uppercase, lowercase and number
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter and one number"
      );
    case 4:
      // uppercase, lowercase, number and special char
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        field,
        "Must contain at least one uppercase, one lowercase letter, one number and one special character"
      );
    case 5:
      // Email pattern
      regEx =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, field, "Must be a valid email address");
    default:
      return false;
  }
}

function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setGreen(field);
    return true;
  } else {
    setError(field, message);
    return false;
  }
}
