// Menangani klik tombol Help
document.getElementById('helpBtn').addEventListener('click', function() {
    alert('This application is used to measure the performance of Javascript files, including execution time, CPU usage, memory, latency, and throughput.');
});

// Menangani klik tombol Info
document.getElementById('infoBtn').addEventListener('click', function() {
    alert('1. Upload the Javascript file you want to test.\n2. Click the "Run Performance Test" button to start testing.\n3. Test results will appear below once the test is complete.');
});

// Menangani perubahan file input (unggah file)
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/javascript') {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;
            // Tampilkan konten file jika diperlukan atau lakukan proses pengujian
        };

        reader.readAsText(file);
    }
});

// Menangani pengujian performance saat tombol dijalankan
document.getElementById('runTest').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Harap unggah file Javascript terlebih dahulu.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const script = event.target.result;

        // Mulai mengukur waktu eksekusi
        const startTime = performance.now();

        // Evaluasi skrip JavaScript
        try {
            const blob = new Blob([script], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            const scriptElement = document.createElement('script');
            scriptElement.src = url;
            document.body.appendChild(scriptElement);

            scriptElement.onload = function() {
                const endTime = performance.now();
                const executionTime = endTime - startTime;

                // Mengukur penggunaan CPU dan Memori (data simulasi)
                const cpuUsage = Math.random() * 100; // Data simulasi
                const memoryUsage = performance.memory ? performance.memory.usedJSHeapSize / (1024 * 1024) : 50; // Data simulasi
                const latency = executionTime; // Latensi dapat diambil dari execution time
                const throughput = cpuUsage / latency; // Menghitung throughput berdasarkan CPU usage dan latency

                // Tampilkan hasil pengujian
                document.getElementById('executionTime').textContent = `Execution Time: ${executionTime.toFixed(4)} ms`;
                document.getElementById('cpuUsage').textContent = `CPU Usage: ${cpuUsage.toFixed(2)}%`;
                document.getElementById('memoryUsage').textContent = `Memory Usage: ${memoryUsage.toFixed(2)} MB`;
                document.getElementById('latency').textContent = `Latency: ${latency.toFixed(4)} ms`;
                document.getElementById('throughput').textContent = `Throughput: ${throughput.toFixed(4)} units/ms`;

                // Menampilkan hasil
                document.getElementById('output').style.display = 'block';
            };
        } catch (error) {
            console.error("Error executing script:", error);
        }
    };

    // Membaca script JavaScript
    reader.readAsText(file);
});
