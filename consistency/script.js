document.getElementById('checkButton').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const outputArea = document.getElementById('output');
  const codePreview = document.getElementById('codePreview');

  // Clear previous results
  outputArea.value = "";
  codePreview.value = "";

  // Ensure a file is selected
  if (fileInput.files.length === 0) {
      outputArea.value = "Please upload a JavaScript file.";
      return;
  }

  const file = fileInput.files[0];

  // Validate file type
  if (file.type !== "application/javascript" && !file.name.endsWith(".js")) {
      outputArea.value = "Invalid file type. Please upload a JavaScript (.js) file.";
      return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
      const code = event.target.result;
      codePreview.value = code; // Display the uploaded code

      const lines = code.split("\n");
      let errors = [];
      let totalLines = lines.length;

      // Regex patterns
      const camelCaseRegex = /^[a-z][a-zA-Z0-9]*$/;   // camelCase for variables/functions
      const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/;  // PascalCase for class names

      lines.forEach((line, index) => {
          const lineNumber = index + 1;
          const trimmedLine = line.trim();

          // Skip empty lines and comments
          if (!trimmedLine || trimmedLine.startsWith("//")) return;

          // Check variables and functions naming (let, const, function)
          const variableOrFunctionMatch = trimmedLine.match(/\b(let|const|function)\s+([a-zA-Z0-9_]+)\b/);
          if (variableOrFunctionMatch) {
              const name = variableOrFunctionMatch[2];
              if (!camelCaseRegex.test(name)) {
                  errors.push(`Line ${lineNumber}: Incorrect naming convention for '${name}' (should use camelCase).`);
              }
          }

          // Check class naming conventions
          const classMatch = trimmedLine.match(/\bclass\s+([a-zA-Z0-9_]+)\b/);
          if (classMatch) {
              const className = classMatch[1];
              if (!pascalCaseRegex.test(className)) {
                  errors.push(`Line ${lineNumber}: Incorrect naming convention for class '${className}' (should use PascalCase).`);
              }
          }
      });

      // Calculate consistency score
      const consistencyScore = ((totalLines - errors.length) / totalLines) * 100;

      // Display results
      outputArea.value = errors.length
          ? errors.join("\n") + `\n\nConsistency Score: ${consistencyScore.toFixed(2)}%`
          : `No issues found!\n\nConsistency Score: 100%`;
  };

  reader.readAsText(file); // Read the uploaded file
});

// Add Help and Info buttons functionality
document.getElementById('helpButton').addEventListener('click', () => {
  alert("Help:\n1. Upload a JavaScript file (.js) to check for naming consistency.\n2. Click the 'Check Consistency' button.\n3. View the results and consistency score below.");
});

document.getElementById('infoButton').addEventListener('click', () => {
  alert("Info:\nThis app checks the consistency of your JavaScript code based on naming conventions:\n- camelCase for variables and functions.\n- PascalCase for class names.\nIt calculates a consistency score based on the number of detected issues.");
});
