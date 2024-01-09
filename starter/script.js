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

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  var getValidInput = function (message, validate) {
    var input = null;
    do {
      input = prompt(message);
      if (validate(input)) {
        return input;
      }
      alert("Invalid input. Please try again.");
    } while (true);
  };

  var length = parseInt(
    getValidInput("Choose a password length between 8 and 128 characters:", function (input) {
      var num = parseInt(input);
      return !isNaN(num) && num >= 8 && num <= 128;
    })
  );

  var includeLowercase = confirm("Include lowercase characters?");
  var includeUppercase = confirm("Include uppercase characters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeSpecial = confirm("Include special characters?");

  if (!includeLowercase && !includeUppercase && !includeNumeric && !includeSpecial) {
    alert("Please select at least one character type.");
    return null;
  }

  return {
    length: length,
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase,
    includeNumeric: includeNumeric,
    includeSpecial: includeSpecial
  };
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();

  if (!options) {
    return ""; // User canceled or entered invalid input
  }

  var validCharacters = [];
  
  if (options.includeLowercase) {
    validCharacters = validCharacters.concat(lowerCasedCharacters);
  }

  if (options.includeUppercase) {
    validCharacters = validCharacters.concat(upperCasedCharacters);
  }

  if (options.includeNumeric) {
    validCharacters = validCharacters.concat(numericCharacters);
  }

  if (options.includeSpecial) {
    validCharacters = validCharacters.concat(specialCharacters);
  }

  var getRandomChar = function () {
    return validCharacters[Math.floor(Math.random() * validCharacters.length)];
  };

  var generatedPassword = Array.from({ length: options.length }, getRandomChar).join("");
  return generatedPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
                  
                  
                  