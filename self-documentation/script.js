function analyzeSelfDocumentation(code) {
  // Ekstraksi komentar
  const comments = code.match(/\/\/.*|\/\*[\s\S]*?\*\//g) || [];

  // Ekstraksi fungsi
  const functionMatches = code.match(/function\s+([a-zA-Z0-9_]+)\s*\(/g) || [];
  const functionNames = functionMatches.map(
    (fn) => fn.match(/function\s+([a-zA-Z0-9_]+)\s*\(/)[1]
  );

  // Analisis variabel
  const variableMatches =
    code.match(/(var|let|const)\s+([a-zA-Z0-9_]+)/g) || [];
  const variableNames = variableMatches.map((v) => v.split(/\s+/)[1]);

  // Keterbacaan (nama variabel dan fungsi deskriptif)
  const descriptiveFunctionNames = functionNames.filter(
    (name) => /^[a-z][a-zA-Z0-9_]*$/.test(name) && name.length > 3
  ).length;

  const descriptiveVariableNames = variableNames.filter(
    (name) => /^[a-z][a-zA-Z0-9_]*$/.test(name) && name.length > 3
  ).length;

  // Konsistensi komentar (jumlah komentar tersebar di seluruh file)
  const averageCommentLength =
    comments.reduce((sum, c) => sum + c.length, 0) / comments.length || 0;
  const commentRelevanceScore = averageCommentLength > 20 ? 1 : 0;

  // Penghitungan skor
  const totalFunctions = functionNames.length;
  const totalVariables = variableNames.length;
  const totalComments = comments.length;

  // Jika tidak ada fungsi, skor nol.
  if (totalFunctions === 0) {
    return {
      total_functions: 0,
      total_variables: totalVariables,
      total_comments: totalComments,
      score: 0,
    };
  }

  const namingConsistencyScore =
    (descriptiveFunctionNames + descriptiveVariableNames) /
    (totalFunctions + totalVariables);
  const commentCoverage = totalComments / (totalFunctions + totalVariables);

  const score =
    0.4 * namingConsistencyScore + // Bobot keterbacaan nama
    0.4 * commentCoverage + // Bobot komentar
    0.2 * commentRelevanceScore; // Bobot relevansi komentar

  return {
    total_functions: totalFunctions,
    total_variables: totalVariables,
    total_comments: totalComments,
    naming_consistency_score: Math.round(namingConsistencyScore * 100),
    comment_coverage_score: Math.round(commentCoverage * 100),
    comment_relevance_score: commentRelevanceScore,
    self_documentation_score: Math.round(score * 100),
  };
}

function analyzeFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a JavaScript file to analyze.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const code = event.target.result;
    document.getElementById("codeDisplay").value = code; // Tampilkan kode di textarea
    const result = analyzeSelfDocumentation(code); // Ganti measureSelfDocumentation dengan analyzeSelfDocumentation

    // Update hasil ke halaman web
    document.getElementById(
      "totalComments"
    ).textContent = `Total Comments: ${result.total_comments}`;
    document.getElementById(
      "totalFunctions"
    ).textContent = `Total Functions: ${result.total_functions}`;
    document.getElementById(
      "totalVariables"
    ).textContent = `Total Variables: ${result.total_variables}`;
    document.getElementById(
      "namingConsistencyScore"
    ).textContent = `Naming Consistency Score: ${result.naming_consistency_score}%`;
    document.getElementById(
      "commentCoverageScore"
    ).textContent = `Comment Coverage Score: ${result.comment_coverage_score}%`;
    document.getElementById(
      "commentRelevanceScore"
    ).textContent = `Comment Relevance Score: ${result.comment_relevance_score}`;
    document.getElementById(
      "selfDocumentationScore"
    ).textContent = `Self Documentation Score: ${result.self_documentation_score}%`;
  };

  reader.readAsText(file);
}

document.getElementById("fileInput").addEventListener("change", function () {
  const fileName = this.files[0]?.name || "No file selected";
  document.getElementById(
    "fileName"
  ).textContent = `Selected File: ${fileName}`;

  const reader = new FileReader();
  reader.onload = function (event) {
    document.getElementById("codeDisplay").value = event.target.result;
  };
  reader.readAsText(this.files[0]);
});

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

document.getElementById("helpButton").addEventListener("click", function () {
  popupTitle.textContent = "How to Use the Self Documentation Tool";
  popupText.innerHTML = `
    1. Click on <b>"Upload JavaScript file"</b> to select a .js file from your computer.<br>
    2. Once uploaded, the content of the file will appear in the text area below.<br>
    3. Click <b>"Calculate Self Documentation"</b> to analyze the file.<br>
    4. Check the results, including:<br>
      - Total Comments in the code.<br>
      - Total Functions detected.<br>
      - Number of Descriptive Functions (with clear, meaningful names).<br>
      - Overall Self Documentation Score, reflecting clarity and maintainability.<br>
    `;
  popup.style.display = "flex";
});

document.getElementById("infoButton").addEventListener("click", function () {
  popupTitle.textContent = "About Self Documentation";
  popupText.innerHTML = `
    Self Documentation is a metric that measures the readability and clarity of a JavaScript file.<br>
    <b>How it works:</b><br>
    - Counts the total number of comments in the code.<br>
    - Analyzes function names to identify descriptive ones (more than three characters).<br>
    - Calculates a score based on the ratio of comments and descriptive functions relative to the total functions and variables.<br>
    <b>Formula for Self Documentation Score:</b><br>
    The score is calculated as follows:<br>
    <code>Score = 0.4 * NamingConsistencyScore + 0.4 * CommentCoverage + 0.2 * CommentRelevanceScore</code><br>
    <b>Components:</b><br>
    - <b>NamingConsistencyScore:</b> Measures the proportion of descriptive function and variable names.<br>
      Formula: <code>(DescriptiveFunctionNames + DescriptiveVariableNames) / (TotalFunctions + TotalVariables)</code><br>
    - <b>CommentCoverage:</b> Evaluates the density of comments in relation to the number of functions and variables.<br>
      Formula: <code>TotalComments / (TotalFunctions + TotalVariables)</code><br>
    - <b>CommentRelevanceScore:</b> A binary score (1 or 0) based on whether the average comment length exceeds 20 characters.<br>
    <b>Purpose:</b><br>
    This tool helps developers improve their code's maintainability and clarity for better collaboration and long-term use.
  `;
  popup.style.display = "flex";
});

// Close popup when close button is clicked
closePopup.addEventListener("click", function () {
  popup.style.display = "none";
});

// Close popup when clicking outside the content
window.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});
