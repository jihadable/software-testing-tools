// Utility function to format dates
function formatDate(date) {
  if (!(date instanceof Date)) throw new Error("Invalid date input");
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
}

// Calculate factorial of a number
function calculateFactorial(num) {
  if (num < 0) throw new Error("Negative numbers are not allowed");
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i; // Multiply result by current number
  }
  return result;
}

/**
 * Fetch user data from an API
 * @param {string} userId - ID of the user to fetch
 * @returns {Promise<object>} User data
 */
async function fetchUserData(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch user data");
  return await response.json();
}

// Class representing a bank account
class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner; // Account owner's name
    this.balance = balance; // Initial balance
  }

  // Deposit money into the account
  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit amount must be positive");
    this.balance += amount;
    return this.balance;
  }

  // Withdraw money from the account
  withdraw(amount) {
    if (amount <= 0) throw new Error("Withdrawal amount must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
    return this.balance;
  }

  // Get account summary
  getSummary() {
    return `Account owner: ${this.owner}, Balance: $${this.balance.toFixed(2)}`;
  }
}

// Main program
(async function main() {
  try {
    console.log("Factorial of 5:", calculateFactorial(5));
    console.log("Today's date:", formatDate(new Date()));

    const userData = await fetchUserData("12345");
    console.log("Fetched user data:", userData);

    const account = new BankAccount("John Doe", 1000);
    account.deposit(500);
    console.log(account.getSummary());
    account.withdraw(300);
    console.log(account.getSummary());
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
})();
