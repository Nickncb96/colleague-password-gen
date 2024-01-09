// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Function to prompt user for password options
function getPasswordOptions() {
  var length = parseInt(prompt("Enter the length of your password (between 8 and 128 characters):"));

  // Validate length input
  if (isNaN(length) || length < 8 || length > 128) {
    alert("Invalid input. Password length must be between 8 and 128 characters.");
    return null;
  }

  var includeLower = confirm("Include lowercase letters?");
  var includeUpper = confirm("Include uppercase letters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeSpecial = confirm("Include special characters?");

  // Validate at least one character type is selected
  if (!includeLower && !includeUpper && !includeNumeric && !includeSpecial) {
    alert("Invalid input. Select at least one character type.");
    return null;
  }

  // Store user input in an object
  var passwordOptions = {
    length: length,
    includeLower: includeLower,
    includeUpper: includeUpper,
    includeNumeric: includeNumeric,
    includeSpecial: includeSpecial
  };

  return passwordOptions;
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();

  // Exit function if user cancels or inputs are invalid
  if (!options) {
    return "";
  }

  // pool of characters based on user input
  var characterPool = [];
  if (options.includeLower) characterPool = characterPool.concat(lowerCasedCharacters);
  if (options.includeUpper) characterPool = characterPool.concat(upperCasedCharacters);
  if (options.includeNumeric) characterPool = characterPool.concat(numericCharacters);
  if (options.includeSpecial) characterPool = characterPool.concat(specialCharacters);

  var generatedPassword = "";
  for (var i = 0; i < options.length; i++) {
    var randomChar = getRandom(characterPool);
    generatedPassword += randomChar;
  }

  return generatedPassword;
}

// references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// event listener to generate button
generateBtn.addEventListener('click', writePassword);

