// JavaScript File (app.js)

// Linting rules for JavaScript
const jsRules = [
  { regex: /var\s+/g, message: 'Avoid using var, use let or const instead.' },
  { regex: /console\.log\(/g, message: 'Remove console.log statements in production code.' },
  { regex: /==\s?/g, message: 'Use strict equality (===) instead of loose equality (==).' },
  { regex: /\s+\n/g, message: 'Avoid trailing spaces at the end of lines.' },
  { regex: /function\s+[a-z]/g, message: 'Function names should start with a capital letter (PascalCase).' },
  { regex: /\/\/\s+TODO:/g, message: 'Remove TODO comments before final deployment.' },
  { regex: /\bvar\b/g, message: 'Consider replacing var with let or const for block scope and immutability.' },
  { regex: /[a-zA-Z0-9_]+\s*=\s*function/g, message: 'Use arrow functions for cleaner syntax and better this context.' },
  { regex: /document\.write\(/g, message: 'Avoid using document.write; it is outdated and insecure.' },
  { regex: /alert\(/g, message: 'Avoid using alert(); it is disruptive to user experience.' },
  { regex: /innerHTML\s*=/g, message: 'Avoid using innerHTML for security reasons. Use safer DOM methods.' },
  { regex: /setTimeout\(.*?\)/g, message: 'Avoid using setTimeout; it might lead to unpredictable behavior.' },
  { regex: /setInterval\(.*?\)/g, message: 'Avoid using setInterval; it might lead to unpredictable behavior.' },
  { regex: /eval\(/g, message: 'Avoid using eval() due to security risks.' },
  { regex: /with\s*\(/g, message: 'Avoid using with statement; it makes code hard to predict and debug.' },
  { regex: /new\s+Array\(/g, message: 'Use array literals instead of new Array().' },
  { regex: /new\s+Object\(/g, message: 'Use object literals instead of new Object().' }
];

// Linting rules for Python
const pythonRules = [
  { regex: /print\(/g, message: 'Avoid using print statements in production code.' },
  { regex: /\s{4}/g, message: 'Use consistent indentation (preferably 4 spaces).' },
  { regex: /==\s?/g, message: 'Ensure comparisons use proper equality checks.' },
  { regex: /def\s+[a-z]/g, message: 'Function names should follow snake_case convention.' },
  { regex: /#\s+TODO:/g, message: 'Remove TODO comments before final deployment.' },
  { regex: /\s+\n/g, message: 'Avoid trailing spaces at the end of lines.' },
  { regex: /exec\(/g, message: 'Avoid using exec() due to potential security risks.' },
  { regex: /except\s+:/g, message: 'Specify exception types explicitly in except blocks.' },
  { regex: /import\s+\*/g, message: 'Avoid wildcard imports to prevent namespace conflicts.' },
  { regex: /global\s+/g, message: 'Avoid using global variables as it reduces code clarity.' },
  { regex: /lambda\s+/g, message: 'Avoid using lambda for complex functions; use def instead.' },
  { regex: /from\s+\.\s+import\s+/g, message: 'Avoid relative imports; use absolute imports instead.' },
  { regex: /assert\s+/g, message: 'Avoid using assert statements in production code.' },
  { regex: /pass\s+/g, message: 'Avoid using pass statement; it indicates incomplete code.' }
];

// Linting rules for Java
const javaRules = [
  { regex: /System\.out\.println\(/g, message: 'Avoid using System.out.println for debugging.' },
  { regex: /==\s?/g, message: 'Use .equals() for object comparison instead of ==.' },
  { regex: /public\s+class\s+[a-z]/g, message: 'Class names should follow PascalCase convention.' },
  { regex: /\s+\n/g, message: 'Avoid trailing spaces at the end of lines.' },
  { regex: /\/\/\s+TODO:/g, message: 'Remove TODO comments before final deployment.' },
  { regex: /\{\s*\}/g, message: 'Avoid using empty code blocks; they serve no purpose.' },
  { regex: /\bnew\s+String\(/g, message: 'Avoid creating new String objects unnecessarily; use string literals instead.' },
  { regex: /\bnull\s+instanceof/g, message: 'Using instanceof on null will always return false; check for null explicitly.' },
  { regex: /public\s+static\s+void\s+main\s*\(.*\)\s*\{/g, message: 'Ensure main methods are used appropriately for application entry points.' },
  { regex: /throws\s+Exception/g, message: 'Avoid generic exceptions; specify more granular exception types.' },
  { regex: /catch\s+\(Exception\s+e\)/g, message: 'Avoid catching generic exceptions; catch specific exceptions instead.' },
  { regex: /System\.exit\(/g, message: 'Avoid using System.exit(); it terminates the JVM abruptly.' },
  { regex: /Thread\.sleep\(/g, message: 'Avoid using Thread.sleep(); it can cause performance issues.' },
  { regex: /synchronized\s+\(/g, message: 'Avoid using synchronized blocks; use higher-level concurrency utilities instead.' }
];

// Analyze code function
const analyzeCode = (code, language) => {
  let rules = [];

  switch (language) {
    case 'javascript':
      rules = jsRules;
      break;
    case 'python':
      rules = pythonRules;
      break;
    case 'java':
      rules = javaRules;
      break;
    default:
      return 'Bahasa yang dipilih tidak didukung.';
  }

  const results = [];
  let issueCount = 0;

  code.split('\n').forEach((line, index) => {
    rules.forEach(rule => {
      const matches = line.match(rule.regex);
      if (matches) {
        issueCount += matches.length;
        results.push({
          line: index + 1,
          message: rule.message,
          suggestion: getSuggestion(rule.message, language)
        });
      }
    });
  });

  const qualityScore = calculateQualityScore(issueCount, code.split('\n').length);

  return {
    results: results.length ? results : 'Tidak ada masalah ditemukan!',
    qualityScore: qualityScore
  };
};

// Function to calculate quality score
const calculateQualityScore = (issueCount, lineCount) => {
  const score = Math.max(0, 100 - (issueCount / lineCount) * 100);
  return `Skor Kualitas Kode: ${score.toFixed(2)} / 100`;
};

// Function to provide suggestions based on the issue message
const getSuggestion = (message, language) => {
  switch (language) {
    case 'javascript':
      switch (message) {
        case 'Avoid using var, use let or const instead.':
          return 'Ganti var dengan let atau const untuk scoping yang lebih baik dan immutability.';
        case 'Remove console.log statements in production code.':
          return 'Gunakan library logging yang tepat atau hapus pernyataan console.log.';
        case 'Use strict equality (===) instead of loose equality (==).':
          return 'Ganti == dengan === untuk menghindari masalah type coercion.';
        case 'Avoid trailing spaces at the end of lines.':
          return 'Hapus spasi yang tidak perlu di akhir baris.';
        case 'Function names should start with a capital letter (PascalCase).':
          return 'Ganti nama fungsi agar mengikuti konvensi PascalCase.';
        case 'Remove TODO comments before final deployment.':
          return 'Selesaikan TODO atau hapus komentar sebelum deployment.';
        case 'Consider replacing var with let or const for block scope and immutability.':
          return 'Gunakan let atau const sebagai pengganti var untuk scoping yang lebih baik dan immutability.';
        case 'Use arrow functions for cleaner syntax and better this context.':
          return 'Ganti ekspresi fungsi dengan arrow functions.';
        case 'Avoid using document.write; it is outdated and insecure.':
          return 'Gunakan metode manipulasi DOM modern sebagai pengganti document.write.';
        case 'Avoid using alert(); it is disruptive to user experience.':
          return 'Gunakan elemen UI non-blocking seperti modals atau notifikasi.';
        case 'Avoid using innerHTML for security reasons. Use safer DOM methods.':
          return 'Gunakan textContent atau metode DOM lainnya untuk menghindari kerentanan XSS.';
        case 'Avoid using setTimeout; it might lead to unpredictable behavior.':
          return 'Pertimbangkan menggunakan Promises atau async/await untuk kontrol yang lebih baik atas kode asinkron.';
        case 'Avoid using setInterval; it might lead to unpredictable behavior.':
          return 'Pertimbangkan menggunakan requestAnimationFrame atau metode penjadwalan lainnya.';
        case 'Avoid using eval() due to security risks.':
          return 'Hindari eval() dan gunakan alternatif yang lebih aman seperti JSON.parse.';
        case 'Avoid using with statement; it makes code hard to predict and debug.':
          return 'Refactor kode untuk menghindari penggunaan with statement.';
        case 'Use array literals instead of new Array().':
          return 'Ganti new Array() dengan array literals [].';
        case 'Use object literals instead of new Object().':
          return 'Ganti new Object() dengan object literals {}.';
        default:
          return 'Tidak ada saran yang tersedia.';
      }
    case 'python':
      switch (message) {
        case 'Avoid using print statements in production code.':
          return 'Gunakan library logging yang tepat sebagai pengganti print statements.';
        case 'Use consistent indentation (preferably 4 spaces).':
          return 'Pastikan indentasi konsisten di seluruh kode, sebaiknya 4 spasi.';
        case 'Ensure comparisons use proper equality checks.':
          return 'Gunakan == untuk pemeriksaan kesetaraan dan is untuk pemeriksaan identitas.';
        case 'Function names should follow snake_case convention.':
          return 'Ganti nama fungsi agar mengikuti konvensi snake_case.';
        case 'Remove TODO comments before final deployment.':
          return 'Selesaikan TODO atau hapus komentar sebelum deployment.';
        case 'Avoid trailing spaces at the end of lines.':
          return 'Hapus spasi yang tidak perlu di akhir baris.';
        case 'Avoid using exec() due to potential security risks.':
          return 'Hindari exec() dan gunakan alternatif yang lebih aman.';
        case 'Specify exception types explicitly in except blocks.':
          return 'Tangkap pengecualian spesifik daripada menggunakan except yang kosong.';
        case 'Avoid wildcard imports to prevent namespace conflicts.':
          return 'Impor hanya komponen yang diperlukan daripada menggunakan wildcard imports.';
        case 'Avoid using global variables as it reduces code clarity.':
          return 'Refactor kode untuk menghindari penggunaan variabel global.';
        case 'Avoid using lambda for complex functions; use def instead.':
          return 'Gunakan def untuk mendefinisikan fungsi kompleks daripada lambda.';
        case 'Avoid relative imports; use absolute imports instead.':
          return 'Gunakan absolute imports untuk meningkatkan keterbacaan dan maintainability kode.';
        case 'Avoid using assert statements in production code.':
          return 'Gunakan penanganan kesalahan yang tepat daripada assert statements dalam kode produksi.';
        case 'Avoid using pass statement; it indicates incomplete code.':
          return 'Hapus pass statements dan lengkapi kode.';
        default:
          return 'Tidak ada saran yang tersedia.';
      }
    case 'java':
      switch (message) {
        case 'Avoid using System.out.println for debugging.':
          return 'Gunakan framework logging yang tepat sebagai pengganti System.out.println.';
        case 'Use .equals() for object comparison instead of ==.':
          return 'Gunakan metode .equals() untuk perbandingan objek untuk menghindari perilaku yang tidak terduga.';
        case 'Class names should follow PascalCase convention.':
          return 'Ganti nama kelas agar mengikuti konvensi PascalCase.';
        case 'Avoid trailing spaces at the end of lines.':
          return 'Hapus spasi yang tidak perlu di akhir baris.';
        case 'Remove TODO comments before final deployment.':
          return 'Selesaikan TODO atau hapus komentar sebelum deployment.';
        case 'Avoid using empty code blocks; they serve no purpose.':
          return 'Hapus blok kode kosong atau tambahkan kode yang bermakna.';
        case 'Avoid creating new String objects unnecessarily; use string literals instead.':
          return 'Gunakan string literals sebagai pengganti pembuatan objek String baru.';
        case 'Using instanceof on null will always return false; check for null explicitly.':
          return 'Periksa null secara eksplisit sebelum menggunakan instanceof.';
        case 'Ensure main methods are used appropriately for application entry points.':
          return 'Gunakan metode main hanya untuk titik masuk aplikasi.';
        case 'Avoid generic exceptions; specify more granular exception types.':
          return 'Tangkap pengecualian spesifik daripada menggunakan Exception generik.';
        case 'Avoid catching generic exceptions; catch specific exceptions instead.':
          return 'Tangkap pengecualian spesifik untuk menangani kondisi kesalahan yang berbeda dengan tepat.';
        case 'Avoid using System.exit(); it terminates the JVM abruptly.':
          return 'Refactor kode untuk menghindari penggunaan System.exit().';
        case 'Avoid using Thread.sleep(); it can cause performance issues.':
          return 'Gunakan utilitas concurrency tingkat tinggi sebagai pengganti Thread.sleep().';
        case 'Avoid using synchronized blocks; use higher-level concurrency utilities instead.':
          return 'Gunakan utilitas concurrency tingkat tinggi seperti java.util.concurrent sebagai pengganti synchronized blocks.';
        default:
          return 'Tidak ada saran yang tersedia.';
      }
    default:
      return 'Tidak ada saran yang tersedia.';
  }
};

// File upload and analysis
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const code = reader.result;
      const language = document.getElementById('language').value;
      const { results, qualityScore } = analyzeCode(code, language);
      displayResults(results, qualityScore);
    };
    reader.readAsText(file);
  } else {
    alert('Tidak ada file yang dipilih.');
  }
};

// Function to display results in a table
const displayResults = (results, qualityScore) => {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (typeof results === 'string') {
    resultsContainer.textContent = results;
    return;
  }

  const table = document.createElement('table');
  table.border = '1';

  const headerRow = document.createElement('tr');
  const headers = ['Baris', 'Pesan', 'Saran'];
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  results.forEach(result => {
    const row = document.createElement('tr');

    const cellLine = document.createElement('td');
    cellLine.textContent = result.line;
    row.appendChild(cellLine);

    const cellMessage = document.createElement('td');
    cellMessage.textContent = result.message;
    row.appendChild(cellMessage);

    const cellSuggestion = document.createElement('td');
    cellSuggestion.textContent = result.suggestion;
    row.appendChild(cellSuggestion);

    table.appendChild(row);
  });

  resultsContainer.appendChild(table);

  const scoreElement = document.createElement('p');
  scoreElement.textContent = qualityScore;
  resultsContainer.appendChild(scoreElement);
};

// Function to validate code input
const validateCodeInput = (code) => {
  if (!code.trim()) {
    alert('Kode tidak boleh kosong.');
    return false;
  }
  return true;
};

// Event Listener for Analyze Button
document.getElementById('analyzeButton').addEventListener('click', () => {
  const code = document.getElementById('codeInput').value;
  const language = document.getElementById('language').value;
  if (validateCodeInput(code)) {
    const { results, qualityScore } = analyzeCode(code, language);
    displayResults(results, qualityScore);
  }
});

// Event Listener for File Upload
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Additional: Clear Results Button
document.getElementById('clearButton').addEventListener('click', () => {
  document.getElementById('results').textContent = '';
  document.getElementById('codeInput').value = '';
  document.getElementById('fileInput').value = '';
});