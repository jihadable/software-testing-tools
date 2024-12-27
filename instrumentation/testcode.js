// Logging examples
console.log("This is a log message.");
console.error("This is an error message.");
console.warn("This is a warning message.");

// Error handling examples
try {
    let result = 10 / 0;
    console.log("Result:", result);
} catch (error) {
    console.error("An error occurred:", error.message);
}

// Input/output examples
const readlineSync = require("readline-sync");
let userInput = readlineSync.question("Enter your name: ");
console.log("Hello, " + userInput);

// Control flow examples
if (userInput === "Admin") {
    console.log("Welcome, Admin!");
} else {
    console.log("Welcome, User!");
}

for (let i = 0; i < 5; i++) {
    console.log("Iteration:", i);
}

while (userInput.length < 5) {
    userInput += "!";
    console.log("Updated input:", userInput);
}

// Methods examples
function greetUser(name) {
    console.log("Greetings, " + name + "!");
}

function calculateSum(a, b) {
    return a + b;
}

// Invoking methods
greetUser(userInput);
let sum = calculateSum(5, 10);
console.log("Sum:", sum);
