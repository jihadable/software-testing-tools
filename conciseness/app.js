
function showFileName(event) {
    const file = event.target.files[0];
    const currentFileElement = document.getElementById('currentFile');
    if (file) {
        currentFileElement.textContent = `Selected file: ${file.name}`;
    } else {
        currentFileElement.textContent = '';
    }
}

// File input onchange
const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", showFileName);

// Calculate button
const calculateBtn = document.getElementById("calculateBtn");
calculateBtn.addEventListener("click", () => {
    const results = document.getElementById("results");
    const functionNamesElement = document.getElementById("functionNames");
    results.textContent = ""; 
    functionNamesElement.textContent = ""; 

    if (!fileInput.files.length) {
        results.textContent = "Please upload a file.";
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const lines = reader.result.split("\n");
        const language = detectLanguage(file.name);

        if (language === "Unknown") {
            results.textContent = "Unsupported file type.";
            return;
        }

        const methodPattern = getMethodPattern(language);

        const totalFeatures = countFeatures(lines, methodPattern);
        const totalLines = countNonEmptyNonCommentLines(lines, language);
        const totalLOC = lines.length;

        if (totalLines > 0 && totalFeatures > 0) {
            const conciseness1 = (totalLOC / totalFeatures).toFixed(2);
            const conciseness2 = (totalLines / totalFeatures).toFixed(2);
            const methodNames = extractMethodNames(lines, methodPattern);

            results.textContent = `
Language: ${language}
File Name: ${file.name}
Total Number of Functions or Tags: ${totalFeatures}
Total Number of Lines: ${totalLOC}
Total Number of Executable Lines: ${totalLines}

Conciseness (#Lines / Function or Tag): ${conciseness1}
Conciseness (#Executable Lines / Function or Tag): ${conciseness2}
            `;
            functionNamesElement.textContent = `
Function Names:
${methodNames.map(name => `- ${name}`).join("\n")}
            `;
        } else {
            results.textContent = "No valid functions found in the file.";
        }
    };

    reader.readAsText(file);
});

function downloadText(elementId, filename) {
    const element = document.getElementById(elementId);
    if (!element || !element.textContent.trim()) {
        alert('No content to download.');
        return;
    }
    const text = element.textContent;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element || !element.textContent.trim()) {
        alert('No content to copy.');
        return;
    }
    const text = element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Text copied to clipboard successfully.');
    }).catch(() => {
        alert('Failed to copy text to clipboard.');
    });
}

function detectLanguage(fileName) {
    const extension = fileName.split('.').pop();
    const languageMap = {
        cs: "C#",
        py: "Python",
        java: "Java",
        js: "JavaScript",
        php: "PHP",
        html: "HTML",
        htm: "HTML"
    };
    return languageMap[extension] || "Unknown";
}

function getMethodPattern(language) {
    const patterns = {
        "C#": /^\s*(public|private|protected|internal|static)?\s+([A-Za-z_][A-Za-z0-9_]*)\s+\w+\s*\(.*\)/,
        "Python": /^\s*def\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(.*\):/,
        "Java": /^\s*(public|private|protected)?\s+\w+\s+\w+\s*\(.*\)/,
        "JavaScript": /^\s*(function|const|let|var)\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*\(.*\)\s*=>|function\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(.*\)/,
        "PHP": /^\s*(function|class)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(.*\)/,
        "HTML": /<([a-zA-Z0-9\-]+)(\s|>)/
    };
    return patterns[language] || /.*/;
}

function countFeatures(lines, methodPattern) {
    return lines.filter(line => methodPattern.test(line.trim())).length;
}

function countNonEmptyNonCommentLines(lines, language) {
    let nonEmptyLines = 0;
    let inMultilineComment = false;

    const commentStart = {
        "C#": "/*",
        "Python": '"""',
        "Java": "/*",
        "JavaScript": "/*",
        "PHP": "/*",
        "HTML": "<!--"
    };

    const commentEnd = {
        "C#": "*/",
        "Python": '"""',
        "Java": "*/",
        "JavaScript": "*/",
        "PHP": "*/",
        "HTML": "-->"
    };

    lines.forEach(line => {
        const trimmed = line.trim();

        if (inMultilineComment) {
            if (trimmed.includes(commentEnd[language])) inMultilineComment = false;
        } else {
            if (trimmed.startsWith(commentStart[language])) {
                inMultilineComment = true;
            } else if (!trimmed.startsWith("//") && !trimmed.startsWith("#") && trimmed) {
                nonEmptyLines++;
            }
        }
    });

    return nonEmptyLines;
}

function extractMethodNames(lines, methodPattern) {
    const methodNames = lines
        .map(line => {
            const match = methodPattern.exec(line.trim());
            if (match) {
                return match[0];
            }
            return null;
        })
        .filter(name => name);

    return methodNames;
}
