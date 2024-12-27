// A simple in-memory log of actions
let actionLog = [];
let loggedInUser = null;

// Function to add a new log entry
function addActionLog(action) {
    const timestamp = new Date().toLocaleString();
    const logEntry = {
        user: loggedInUser || 'Guest',
        action: action,
        timestamp: timestamp
    };
    actionLog.push(logEntry);
    updateLogDisplay();
}

// Update the display of the action log
function updateLogDisplay() {
    const logList = document.getElementById('actionLog');
    logList.innerHTML = ''; // Clear the current list
    actionLog.forEach((log, index) => {
        const li = document.createElement('li');
        li.textContent = `${log.timestamp} - ${log.user}: ${log.action}`;
        logList.appendChild(li);
    });
}

// Function to handle login
document.getElementById('loginButton').addEventListener('click', () => {
    loggedInUser = prompt('Enter your username:');
    if (loggedInUser) {
        addActionLog(`User ${loggedInUser} logged in.`);
    }
});

// Function to handle logout
document.getElementById('logoutButton').addEventListener('click', () => {
    if (loggedInUser) {
        addActionLog(`User ${loggedInUser} logged out.`);
        loggedInUser = null;
    } else {
        alert('No user is logged in.');
    }
});
