let userName = "John";      // Correct camelCase
function getUserData() {    // Correct camelCase
    console.log("Hello!");}

let User_name = "John";     // Incorrect: not camelCase

function Get_user_Data() {  // Incorrect: not camelCase
    console.log("Hello!");
}
class UserProfile {          // Correct PascalCase
    constructor(name) {
        this.name = name;
    }
}
const user = new UserProfile("John");
class user_profile {         // Incorrect: not PascalCase
    constructor(name) {
        this.name = name;
    }
}
const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/;  
