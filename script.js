
let lastAccel = 0;
let moveCount = 0;
let stepCount = 0;

function updateStatus(level) {
    const statusBox = document.getElementById('congestion-status');
    if (level === "Low") {
        statusBox.textContent = "🟢 Low Congestion";
        statusBox.style.backgroundColor = "#4CAF50";
    } else if (level === "Medium") {
        statusBox.textContent = "🟠 Medium Congestion";
        statusBox.style.backgroundColor = "#FFA500";
    } else if (level === "High") {
        statusBox.textContent = "🔴 High Congestion";
        statusBox.style.backgroundColor = "#F44336";
    } else {
        statusBox.textContent = "Detecting...";
        statusBox.style.backgroundColor = "#999";
    }
}

window.addEventListener('devicemotion', function(event) {
    let acc = event.accelerationIncludingGravity;
    if (!acc) return;

    let total = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
    let delta = Math.abs(total - lastAccel);
    lastAccel = total;

    if (delta > 1) {
        moveCount++;
        stepCount++;
        document.getElementById('step-count').textContent = stepCount;
    }

    if (moveCount > 30) {
        updateStatus("High");
    } else if (moveCount > 15) {
        updateStatus("Medium");
    } else {
        updateStatus("Low");
    }

    setTimeout(() => { moveCount = 0; }, 3000);
});

// Bluetooth Scan
async function scanBluetooth() {
    try {
        const options = {
            acceptAllDevices: true
        };
        const device = await navigator.bluetooth.requestDevice(options);
        document.getElementById('bt-devices').textContent = device.name || "Unnamed device";
    } catch (error) {
        document.getElementById('bt-devices').textContent = "Bluetooth unavailable or denied.";
    }
}

setTimeout(scanBluetooth, 2000);
