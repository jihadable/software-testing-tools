document.querySelector(".how-to").addEventListener("click", () => {
    alert(`1. Upload Javascript file\n2. Press the "Calculate Modularity" button\n3. The modularity value will appear on the screen`)
})

document.querySelector(".info").addEventListener("click", () => {
    alert("This software is used to calculate the modularity value of a source code in the Javascript.\n\nModularity can be calculated with the formula ((Fan-in + Fan-out) / Total module).")
})

const fileInput = document.querySelector(".file-input input")
let code = ""

fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        const jsFile = fileInput.files[0]

        document.querySelector(".file-uploaded").innerHTML = `📄${jsFile.name}`
        document.querySelector(".file-input label").style.display = "none"
        document.querySelector(".run-btn").style.display = "flex"

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                code = e.target.result
                showPreview(code)
            } catch (error) {
                alert("File js tidak valid")
            }
        }

        reader.readAsText(jsFile)
    }
})

function showPreview(code){
    document.querySelector(".preview-container").style.display = "flex"
    document.querySelector(".preview").innerHTML = `<pre>${code}</pre>`
}

const runBtn = document.querySelector(".run-btn")
const result = document.querySelector(".result")

runBtn.addEventListener("click", () => {
    if (code == "") return

    const modularityScore = analyzeModularity(code)

    result.innerHTML = `
        <div className="total-module">Total module: ${modularityScore.totalModules}</div>
        <div className="total-fan-in">Total Fan-in: ${modularityScore.totalFanIn}</div>
        <div className="total-fan-out">Total Fan-out: ${modularityScore.totalFanOut}</div>
        <div className="modularity-score">Modularity score: ${modularityScore.modularityScore}%</div>
    `
})

function analyzeModularity(sourceCode) {
    const ast = acorn.parse(sourceCode, { ecmaVersion: 2020, sourceType: "module" });
    const modules = new Map(); // Track modules (import/export/local functions)
    const imports = new Map(); // Track imported modules

    // Helper to ensure module is tracked
    function ensureModule(name) {
        if (!modules.has(name)) {
            modules.set(name, { fanIn: 0, fanOut: 0, calls: [] });
        }
    }

    // Analyze function declarations and function calls
    function analyzeNode(node, currentFunction = null) {
        switch (node.type) {
            case "FunctionDeclaration":
                const functionName = node.id.name;
                ensureModule(functionName);

                // If inside another function, register the dependency
                if (currentFunction) {
                    modules.get(currentFunction).fanOut += 1;
                    modules.get(currentFunction).calls.push(functionName);
                }

                // Analyze the body of the function
                node.body.body.forEach(childNode => analyzeNode(childNode, functionName));
                break;

            case "CallExpression":
                // Track function calls
                if (node.callee.type === "Identifier") {
                    const calledFunction = node.callee.name;
                    ensureModule(calledFunction);

                    // If inside a function, register the call
                    if (currentFunction) {
                        modules.get(currentFunction).fanOut += 1;
                        modules.get(currentFunction).calls.push(calledFunction);
                    }

                    // Increase fanIn for the called function
                    modules.get(calledFunction).fanIn += 1;
                }
                break;

            case "ImportDeclaration":
                // Track imports and map them to local names
                node.specifiers.forEach(specifier => {
                    const importedName = specifier.local.name;
                    const source = node.source.value;
                    imports.set(importedName, source);
                    ensureModule(importedName); // Track the local alias
                });
                break;

            default:
                // Traverse child nodes if present
                for (const key in node) {
                    const childNode = node[key];
                    if (childNode && typeof childNode === "object" && childNode.type) {
                        analyzeNode(childNode, currentFunction);
                    }
                }
        }
    }

    // Traverse AST and analyze each node
    ast.body.forEach(node => {
        analyzeNode(node);
    });

    // Calculate metrics
    let totalFanIn = 0;
    let totalFanOut = 0;
    modules.forEach(({ fanIn, fanOut }) => {
        totalFanIn += fanIn;
        totalFanOut += fanOut;
    });

    const modularityScore = ((totalFanIn + totalFanOut) / modules.size * 100).toFixed(2);

    return {
        totalModules: modules.size,
        totalFanIn,
        totalFanOut,
        modularityScore,
        modules: Array.from(modules.entries()).map(([module, data]) => ({
            module,
            fanIn: data.fanIn,
            fanOut: data.fanOut
        })),
    };
}