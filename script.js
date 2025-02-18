function toggleFields() {
    let calcType = document.getElementById("calcType").value;
    document.getElementById("stitchFields").style.display = (calcType === "stitch") ? "block" : "none";
    document.getElementById("pieceFields").style.display = (calcType === "piece") ? "block" : "none";
    document.getElementById("yardFields").style.display = (calcType === "yard") ? "block" : "none";
}

function calculate() {
    let calcType = document.getElementById("calcType").value;
    let rate = parseFloat(document.getElementById("rate").value);
    let machineSpeed = parseFloat(document.getElementById("machineSpeed").value);
    let headCount = parseFloat(document.getElementById("headCount").value);
    let efficiency = parseFloat(document.getElementById("efficiency").value) / 100;
    
    let stitchCount = 0;

    if (calcType === "stitch") {
        stitchCount = parseFloat(document.getElementById("stitchCount").value);
    } else if (calcType === "piece") {
        let stitchPerPiece = parseFloat(document.getElementById("stitchPerPiece").value);
        let pieceCount = parseFloat(document.getElementById("pieceCount").value);
        stitchCount = stitchPerPiece * pieceCount;
    } else if (calcType === "yard") {
        let stitchPerYard = parseFloat(document.getElementById("stitchPerYard").value);
        let yardCount = parseFloat(document.getElementById("yardCount").value);
        stitchCount = stitchPerYard * yardCount;
    }

    if (isNaN(stitchCount) || stitchCount <= 0) {
        alert("Please enter a valid stitch count!");
        return;
    }

    let totalCost = (stitchCount / 1000) * rate;
    let totalTime = stitchCount / (machineSpeed * headCount * efficiency);
    let totalHours = totalTime / 60;
    let totalShifts = totalHours / 12;

    document.getElementById("costResult").innerText = `Total Cost: ৳${totalCost.toFixed(2)}`;
    document.getElementById("timeResult").innerText = `Total Time: ${totalTime.toFixed(2)} minutes (${totalHours.toFixed(2)} hours)`;
    document.getElementById("shiftResult").innerText = `Shifts Required (12-hour): ${totalShifts.toFixed(2)}`;
}
