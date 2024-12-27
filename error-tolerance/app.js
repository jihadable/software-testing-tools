document.getElementById("fileInput").addEventListener("change", handleFileSelect);

let totalErrorTolerance = 0;
let fileCount = 0;
const resultTableBody = document.querySelector("#resultTable tbody");
const codePreview = document.getElementById("codePreview");

function handleFileSelect(event) {
  const files = event.target.files;
  Array.from(files).forEach(readFile);
}

function readFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    analyzeFile(file.name, reader.result);
    updateCodePreview(file.name, reader.result);
  };
  reader.readAsText(file);
}

function analyzeFile(fileName, content) {
  const lines = content.split("\n");
  let computations = 0,
    controls = 0,
    errorHandlers = 0;

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("//") || line.startsWith("#")) return; // Skip comments

    if (
      line.includes("+") ||
      line.includes("-") ||
      line.includes("*") ||
      line.includes("/") ||
      line.includes("%")
    )
      computations++;
    if (
      line.includes("if") ||
      line.includes("for") ||
      line.includes("while") ||
      line.includes("switch")
    )
      controls++;
    if (
      line.includes("try") ||
      line.includes("catch") ||
      line.includes("finally") ||
      line.includes("throw")
    )
      errorHandlers++;
  });

  const errorTolerance = computeErrorTolerance(computations, controls, errorHandlers);
  totalErrorTolerance += errorTolerance;
  fileCount++;

  updateTable(fileName, computations, controls, errorHandlers, errorTolerance);
}

function computeErrorTolerance(computations, controls, errorHandlers) {
  return computations + controls === 0
    ? 0
    : ((errorHandlers / (computations + controls)) * 100).toFixed(2);
}

function updateTable(fileName, computations, controls, errorHandlers, errorTolerance) {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${fileName}</td>
      <td>${computations}</td>
      <td>${controls}</td>
      <td>${errorHandlers}</td>
      <td>${errorTolerance}%</td>
  `;
  if (errorTolerance > 50) row.classList.add("highlight-error");
  resultTableBody.appendChild(row);
}

function updateCodePreview(fileName, content) {
  codePreview.textContent = `File: ${fileName}\n\n${content}`;
}

function reset() {
  totalErrorTolerance = 0;
  fileCount = 0;
  resultTableBody.innerHTML = "";
  codePreview.textContent = "No file selected.";
}

function showInfo() {
  alert(
    "This tool is designed to analyze the error tolerance of code files. It calculates the percentage of error handling relative to the number of computations and control structures."
  );
}

function showHelp() {
  alert(
    "How to Use:\n1. Click the 'Choose File' button and select code files.\n2. View results in the table below.\n3. Click 'Reset' to start over. \nClick Reset if you want to reset the history analyzer."
  );
}
