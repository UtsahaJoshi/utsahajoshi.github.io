//declaration and definition
var passwordLength = 12;
var hasCharacter = {
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false
}

var lengthRangeInput = document.getElementById("option-length-range");
var lengthInput = document.getElementById("option-length");

var lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
var symbolicCharacters = "!@#$%^&*()-_+={}[].,<>:;";

darkMode = true;

// function to set password length
function passwordLengthValueChange(lengthValue) {
    if (lengthValue>32) lengthValue = 32;
    if (lengthValue<2) lengthValue = 2;
    passwordLength = Math.floor(lengthValue);
    lengthRangeInput.value = lengthValue;
    lengthInput.value = passwordLength;
}

//function to check if toggle values are changed
function toggleValueChange(whichToggle) {
    switch(whichToggle){
        case "lowercase":
            hasCharacter.lowercase = !hasCharacter.lowercase;
            break;
        case "uppercase":
            hasCharacter.uppercase = !hasCharacter.uppercase;
            break;
        case "number":
            hasCharacter.numbers = !hasCharacter.numbers;
            break;
        case "symbol":
            hasCharacter.symbols = !hasCharacter.symbols;
            break;
    }

    // make sure lowercase toggle stays turned on incase no other toggles are on
    if (getMustHaveCharacterTypesNames().length === 0){
        hasCharacter.lowercase = !hasCharacter.lowercase;
        var lowercaseToggle = document.getElementById("lowercase-toggle");
        lowercaseToggle.checked = true;
    }
}

//function to generate password
function generatePassword() {
    var password = "";
    var mustHaveCharacterTypes = getMustHaveCharacterTypesNames();

    for(var i = 0; i < passwordLength; i++){
        
        password += getACharacter(mustHaveCharacterTypes);
    }
    displayPasswordToUsers(password);
}

//display password on the screen
function displayPasswordToUsers(password){
    var displayBoard = document.getElementById("password-display");
    var copyButton = document.getElementById("copy-button");
    var passwordText = document.getElementById("password-text");
    passwordText.innerText = password;
    displayBoard.style.display = "block";
    copyButton.style.display = "block";
}

// get all the character types that password must have according to the user specified toggles inputs
function getMustHaveCharacterTypesNames(){
    var hasCharactersConfirmed = [];
    Object.entries(hasCharacter).forEach(entry => {
        const [key, value] = entry;
        if (value) {
            hasCharactersConfirmed.push(key);
        }
      });
      return hasCharactersConfirmed;
}

// get one random character
function getACharacter(mustHaveCharacterTypes){
    randomCharacterTypeIndex = Math.floor(Math.random() * mustHaveCharacterTypes.length);
    randomCharacterType = mustHaveCharacterTypes[randomCharacterTypeIndex];
    switch(randomCharacterType){
        case "lowercase":
            return getRandomLetter("lowercase");
        case "uppercase":
            return getRandomLetter("uppercase");
        case "numbers":
            return getRandomNumber();
        case "symbols":
            return getRandomSymbol();
        default:
            break;
    }
}

// get a random letter
function getRandomLetter(type){
    var letter;
    var randomStringIndex = Math.floor(Math.random() * lowerCaseCharacters.length);
    letter = lowerCaseCharacters[randomStringIndex];
    if (type === "lowercase"){
        return letter;
    }
    return letter.toUpperCase();
}

// get a random symbol
function getRandomSymbol(){
    var symbol;
    var randomStringIndex = Math.floor(Math.random() * symbolicCharacters.length);
    symbol = symbolicCharacters[randomStringIndex];
    return symbol;
}

// get a random number
function getRandomNumber(){
    var number;
    number = Math.floor(Math.random()*10);
    return number;
}

// function to copy password to clipboard and notify users
function copyPassword(){
    var from = document.getElementById('password-text');
    var copiedNotification = document.getElementById('copied-notify-text');

    var range = document.createRange();
    window.getSelection().removeAllRanges();
    range.selectNode(from);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    copiedNotification.style.display = "block";
    setTimeout(function(){ 
        copiedNotification.style.display = "none";
    }, 1000);
}

// change between dark and light mode
function changeMode(){
    darkMode = !darkMode;
    var body = document.getElementsByTagName("BODY")[0];
    var displayBoard = document.getElementById("password-display");
    var modeButton = document.getElementById("mode-button");
    var lengthSlider = document.getElementById("option-length-range");
    var lengthInput = document.getElementById("option-length");
    if (!darkMode) {
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#000000";
        displayBoard.style.backgroundColor = "#ffffff";
        modeButton.style.backgroundColor = "#ffffff";
        lengthSlider.style.backgroundColor = "#ffffff";
        lengthInput.style.backgroundColor = "#ffffff";
        lengthInput.style.color = "#000000";
    } else {
        body.style.backgroundColor = "#000000";
        body.style.color = "#dadada";
        displayBoard.style.backgroundColor = "#212121";
        modeButton.style.backgroundColor = "#000000";
        lengthSlider.style.backgroundColor = "#000000";
        lengthInput.style.backgroundColor = "#000000";
        lengthInput.style.color = "#dadada";
    }

}