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

function passwordLengthValueChange(lengthValue) {
    if (lengthValue>32) lengthValue = 32;
    if (lengthValue<2) lengthValue = 2;
    passwordLength = lengthValue;
    lengthRangeInput.value = passwordLength;
    lengthInput.value = passwordLength;
}

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
}

function generatePassword() {
    var password = "";
    var mustHaveCharacterTypes = getMustHaveCharacterTypesNames();

    for(var i = 0; i < passwordLength; i++){
        
        password += getACharacter(mustHaveCharacterTypes);
    }
    displayPasswordToUsers(password);
}

function displayPasswordToUsers(password){
    var displayBoard = document.getElementById("password-display");
    var copyButton = document.getElementById("copy-button");
    var passwordText = document.getElementById("password-text");
    passwordText.innerText = password;
    displayBoard.style.display = "block";
    copyButton.style.display = "block";
}

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
function getACharacter(mustHaveCharacterTypes){
    if (mustHaveCharacterTypes.length === 0){
        return getRandomLetter("lowercase");
    }
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
function getRandomLetter(type){
    var letter;
    var randomStringIndex = Math.floor(Math.random() * lowerCaseCharacters.length);
    letter = lowerCaseCharacters[randomStringIndex];
    if (type === "lowercase"){
        return letter;
    }
    return letter.toUpperCase();
}

function getRandomSymbol(){
    var symbol;
    var randomStringIndex = Math.floor(Math.random() * symbolicCharacters.length);
    symbol = symbolicCharacters[randomStringIndex];
    return symbol;
}

function getRandomNumber(){
    var number;
    number = Math.floor(Math.random()*10);
    return number;
}

function copyPassword(){
    var from = document.getElementById('password-text');
    var range = document.createRange();
    window.getSelection().removeAllRanges();
    range.selectNode(from);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

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