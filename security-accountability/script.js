document.getElementById('upload-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileContent = e.target.result;
            document.getElementById('file-content').textContent = fileContent;
        };
        reader.readAsText(file);
    }
});

document.getElementById('calculate-btn').addEventListener('click', function() {
    const fileContent = document.getElementById('file-content').textContent;
    
    if (fileContent) {
        // Simulasi menghitung hasil Security Accountability
        const totalModules = Math.floor(Math.random() * 10) + 1;
        const protectedModules = Math.floor(Math.random() * totalModules);
        const leakModules = Math.floor(Math.random() * (totalModules - protectedModules));
        const roleModules = Math.floor(Math.random() * totalModules);
        const securityScore = ((protectedModules / totalModules) * 100).toFixed(2);

        document.getElementById('total-modules').textContent = totalModules;
        document.getElementById('protected-modules').textContent = protectedModules;
        document.getElementById('leak-modules').textContent = leakModules;
        document.getElementById('role-modules').textContent = roleModules;
        document.getElementById('security-score').textContent = securityScore + '%';
    }
});

// Help and Info modal handling
document.getElementById('help-btn').addEventListener('click', function() {
    document.getElementById('help-modal').style.display = 'flex';
});

document.getElementById('info-btn').addEventListener('click', function() {
    document.getElementById('info-modal').style.display = 'flex';
});

document.getElementById('close-help').addEventListener('click', function() {
    document.getElementById('help-modal').style.display = 'none';
});

document.getElementById('close-info').addEventListener('click', function() {
    document.getElementById('info-modal').style.display = 'none';
});
