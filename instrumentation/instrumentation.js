// Function to show modal with title and content
function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').textContent = content;
    document.getElementById('overlay').style.display = 'flex';
}

// Close modal
document.getElementById('closeModalButton').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'none';
});

// Handle file upload and validate file type
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const allowedTypes = ['text/javascript', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format file tidak didukung. Pilih file .js atau .txt.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('sourceCode').value = e.target.result;
        };
        reader.readAsText(file);
    }
});

// Process file content and display results
document.getElementById('processButton').addEventListener('click', function () {
    const sourceCode = document.getElementById('sourceCode').value.trim();

    // Cek jika kode kosong
    if (!sourceCode) {
        alert('Silakan masukkan atau unggah kode sumber terlebih dahulu.');
        return;
    }

    const results = processFile(sourceCode); // Call function to process the file and get results

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.category}</td>
            <td>${result.value}</td>
            <td><button class="info-button" onclick="showModal('${result.category} Info', '${result.info}')">i</button></td>
        `;
        tableBody.appendChild(row);
    });
});

// Function to process the file and calculate values for each category
function processFile(sourceCode) {
    const results = [
        { category: 'Number of Logging Errors', value: calculateLoggingErrors(sourceCode), info: 'Counts the number of logging error messages in the code. Indicates how well the program tracks errors.' },
        { category: 'Number of Error Exceptions', value: calculateErrorExceptions(sourceCode), info: 'Counts how many error exceptions are found in the code, reflecting potential failure points.' },
        { category: 'Number of Control Flow Issues', value: calculateControlFlowIssues(sourceCode), info: 'Measures issues in control flow that could potentially cause bugs or unexpected behavior.' },
        { category: 'Number of Input/Output Operations', value: calculateInputOutput(sourceCode), info: 'Counts I/O operations, reflecting how the program handles data flow in and out.' },
        { category: 'Number of Methods', value: calculateMethods(sourceCode), info: 'Counts the number of methods or functions, helping assess the complexity of the program.' },
        { category: 'Total Instrumentation', value: calculateTotalInstrumentation(sourceCode), info: 'Measures the total instrumentation or code added to track errors and performance.' },
        { category: 'Total Items to Be Instrumented', value: calculateTotalItemsToBeInstrumented(sourceCode), info: 'Counts all code sections that should be instrumented for error tracking and analysis.' },
        { category: 'Percentage of Instrumentation', value: calculatePercentage(sourceCode), info: 'Calculates the percentage of the code that has been instrumented for error tracking.' },
        { category: 'Code Complexity', value: calculateCodeComplexity(sourceCode), info: 'Measures the overall complexity of the code, which can impact error detection and program behavior.' },
        { category: 'Number of Function Calls', value: calculateFunctionCalls(sourceCode), info: 'Counts the number of function calls, showing the program’s modularity and potential points of failure.' },
        { category: 'Number of Loops', value: calculateLoops(sourceCode), info: 'Counts the loops in the code, which can often be sources of errors if not properly handled.' }
    ];
    return results;
}

// Placeholder functions for calculating values, implement the logic based on actual needs
function calculateLoggingErrors(code) {
    const regex = /console\.error/g;
    return (code.match(regex) || []).length;
}

function calculateErrorExceptions(code) {
    const regex = /throw new Error/g;
    return (code.match(regex) || []).length;
}

function calculateControlFlowIssues(code) {
    const regex = /\b(if|else|for|while|switch)\b/g;
    return (code.match(regex) || []).length;
}

function calculateInputOutput(code) {
    const regex = /\b(fs\.readFileSync|process\.stdin)\b/g;
    return (code.match(regex) || []).length;
}

function calculateMethods(code) {
    const regex = /\bfunction\b/g;
    return (code.match(regex) || []).length;
}

function calculateTotalInstrumentation(code) {
    const regex = /console\.log|console\.error|console\.warn/g;
    return (code.match(regex) || []).length;
}

function calculateTotalItemsToBeInstrumented(code) {
    return code.split('\n').length;
}

function calculatePercentage(code) {
    const totalItems = code.split('\n').length;
    const totalInstrumentation = calculateTotalInstrumentation(code);
    return ((totalInstrumentation / totalItems) * 100).toFixed(2);
}

function calculateCodeComplexity(code) {
    const complexity = code.split('\n').length + (code.match(/if|for|while|switch/g) || []).length;
    return complexity;
}

function calculateFunctionCalls(code) {
    const regex = /\b\w+\(/g;
    return (code.match(regex) || []).length;
}

function calculateLoops(code) {
    const regex = /\b(for|while)\b/g;
    return (code.match(regex) || []).length;
}


// Export results to CSV
document.getElementById('exportButton').addEventListener('click', function () {
    const results = processFile(); // Get the processed results
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Value\n"; // Header
    results.forEach(result => {
        csvContent += `${result.category},${result.value}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
// Info and Help Modal
document.getElementById('helpButton').addEventListener('click', function () {
    showModal('Help', `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;">
            <p><b>1. Input Source Code</b><br>
            &nbsp;&nbsp;&nbsp;&nbsp;- <b>Option 1:</b> Press the <b>"Browse File"</b> button to upload your source code file.<br>
            &nbsp;&nbsp;&nbsp;&nbsp;- <b>Option 2:</b> Copy and paste the source code directly into the provided text box.</p>

            <p><b>2.</b> Press the <b>"Check"</b> button to start the instrumentation analysis process.</p>
            <p><b>3.</b> The analysis results will be displayed in a table.</p>
            <p><b>4.</b> If necessary, you can export the analysis results to a <b>CSV</b> file.</p>

            <br>
            <p><b>Important Information:</b><br>
            &nbsp;&nbsp;&nbsp;&nbsp;- This tool analyzes source code written in <i>JavaScript</i> or <i>TypeScript</i>.<br>
            &nbsp;&nbsp;&nbsp;&nbsp;- Results are calculated and displayed in <i>real-time</i> after analysis.</p>
        </div>
    `);
});

document.getElementById('infoButton').addEventListener('click', function () {
    showModal('Info', `
        <div style="text-align: justify; font-size: 14px; line-height: 1.6;">
            <p>
                This application helps evaluate a program’s ability to monitor its operations and detect errors using error logs.
                It identifies various error types, such as control flow issues and input/output errors, and assigns scores
                to reflect their impact on system performance.
            </p>
            <p>
                Through detailed analysis, the application pinpoints error locations, enabling developers to understand
                and resolve issues efficiently, ultimately improving code quality and system reliability.
            </p>
        </div>
    `);
});




// Function to show modal with title and content
function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = content;
    document.getElementById('overlay').style.display = 'flex';
}

// Close modal
document.getElementById('closeModalButton').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'none';
});

// Handle file upload and validate file type
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const allowedTypes = ['text/javascript', 'text/plain'];
        if (!allowedTypes.includes(file.type)) {
            alert('Format file tidak didukung. Pilih file .js atau .txt.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('sourceCode').value = e.target.result;
        };
        reader.readAsText(file);
    }
});

// Process file content and display results
document.getElementById('processButton').addEventListener('click', function () {
    const results = processFile(); // Call function to process the file and get results

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.category}</td>
            <td>${result.value}</td>
            <td><button class="info-button" onclick="showModal('${result.category} Info', '${result.info}')">i</button></td>
        `;
        tableBody.appendChild(row);
    });
});

function processFile() {
    const sourceCode = document.getElementById('sourceCode').value.trim();
    
    // Tambahkan validasi untuk memastikan tidak ada spasi kosong
    if (!sourceCode) {
        return [ 
            { category: 'Number of Logging Errors', value: 0, info: '' },
            { category: 'Number of Error Exceptions', value: 0, info: '' },
            { category: 'Number of Control Flow Issues', value: 0, info: '' },
            { category: 'Number of Input/Output Operations', value: 0, info: '' },
            { category: 'Number of Methods', value: 0, info: '' },
            { category: 'Total Instrumentation', value: 0, info: '' },
            { category: 'Total Items to Be Instrumented', value: 0, info: '' },
            { category: 'Percentage of Instrumentation', value: 0, info: '' },
            { category: 'Code Complexity', value: 0, info: '' },
            { category: 'Number of Function Calls', value: 0, info: '' },
            { category: 'Number of Loops', value: 0, info: '' }
        ];
    }

    // Jika kode ada, lanjutkan proses seperti biasa
    return [
        { category: 'Number of Logging Errors', value: calculateLoggingErrors(sourceCode), info: 'Counts the number of logging error messages in the code.' },
        { category: 'Number of Error Exceptions', value: calculateErrorExceptions(sourceCode), info: 'Counts how many error exceptions are found in the code.' },
        { category: 'Number of Control Flow Issues', value: calculateControlFlowIssues(sourceCode), info: 'Measures control flow structures.' },
        { category: 'Number of Input/Output Operations', value: calculateInputOutput(sourceCode), info: 'Counts I/O operations.' },
        { category: 'Number of Methods', value: calculateMethods(sourceCode), info: 'Counts the number of methods or functions.' },
        { category: 'Total Instrumentation', value: calculateTotalInstrumentation(sourceCode), info: 'Measures instrumentation code added.' },
        { category: 'Total Items to Be Instrumented', value: calculateTotalItemsToBeInstrumented(sourceCode), info: 'Counts code sections that should be instrumented.' },
        { category: 'Percentage of Instrumentation', value: calculatePercentage(sourceCode), info: 'Calculates the percentage of instrumentation.' },
        { category: 'Code Complexity', value: calculateCodeComplexity(sourceCode), info: 'Measures overall complexity of the code.' },
        { category: 'Number of Function Calls', value: calculateFunctionCalls(sourceCode), info: 'Counts the number of function calls.' },
        { category: 'Number of Loops', value: calculateLoops(sourceCode), info: 'Counts the loops in the code.' }
    ];
}


// Placeholder functions for calculating values, implement the logic based on actual needs
function calculateLoggingErrors(code) {
    // Example logic: count occurrences of "console.error"
    const regex = /console\.error/g;
    return (code.match(regex) || []).length;
}

function calculateErrorExceptions(code) {
    // Example logic: count occurrences of "throw new Error"
    const regex = /throw new Error/g;
    return (code.match(regex) || []).length;
}

function calculateControlFlowIssues(code) {
    // Example logic: detect 'if', 'else', 'for', etc. to identify control flow structures
    const regex = /\b(if|else|for|while|switch)\b/g;
    return (code.match(regex) || []).length;
}

function calculateInputOutput(code) {
    // Example logic: detect I/O operations like 'fs.readFileSync' or 'process.stdin'
    const regex = /\b(fs\.readFileSync|process\.stdin)\b/g;
    return (code.match(regex) || []).length;
}

function calculateMethods(code) {
    // Example logic: count function definitions
    const regex = /\bfunction\b/g;
    return (code.match(regex) || []).length;
}

function calculateTotalInstrumentation(code) {
    // Example logic: count instrumentation commands
    const regex = /console\.log|console\.error|console\.warn/g;
    return (code.match(regex) || []).length;
}

function calculateTotalItemsToBeInstrumented(code) {
    // Example logic: count lines that should ideally be instrumented
    return code.split('\n').length;
}

function calculatePercentage(code) {
    // Example logic: calculate percentage of code instrumented
    const totalItems = code.split('\n').length;
    const totalInstrumentation = calculateTotalInstrumentation(code);
    return ((totalInstrumentation / totalItems) * 100).toFixed(2);
}

function calculateCodeComplexity(code) {
    // Example logic: measure complexity based on the number of lines and structures
    const complexity = code.split('\n').length + (code.match(/if|for|while|switch/g) || []).length;
    return complexity;
}

function calculateFunctionCalls(code) {
    // Example logic: count function calls
    const regex = /\b\w+\(/g;
    return (code.match(regex) || []).length;
}

function calculateLoops(code) {
    // Example logic: count loops (for, while, etc.)
    const regex = /\b(for|while)\b/g;
    return (code.match(regex) || []).length;
}

// Export results to CSV
document.getElementById('exportButton').addEventListener('click', function () {
    const results = processFile(); // Get the processed results
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Value\n"; // Header
    results.forEach(result => {
        csvContent += `${result.category},${result.value}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
