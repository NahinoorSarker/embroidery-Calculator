// Function to show/hide input fields based on selected option
function toggleFields() {
    let calcType = document.getElementById("calcType").value;
    document.getElementById("multipleFields").style.display = (calcType === "multiple") ? "block" : "none";
}

// Function to get numeric input values safely
function getInputValue(id) {
    let value = parseFloat(document.getElementById(id).value);
    return isNaN(value) || value < 0 ? 0 : value;
}

// Function to auto-calculate total stitch per piece
function calculateTotalStitch() {
    let neck = getInputValue("neckStitch");
    let sleeve = getInputValue("sleeveStitch");
    let body = getInputValue("bodyStitch");
    let panel = getInputValue("panelStitch");
    let extra = getInputValue("extraStitch");
    let totalPieces = getInputValue("totalPieces");

    let totalStitchPerPiece = neck + sleeve + body + panel + extra;
    let totalStitch = totalStitchPerPiece * totalPieces;

    document.getElementById("totalStitchPerPiece").innerText = totalStitchPerPiece;
    document.getElementById("totalStitch").value = totalStitch; // Hidden value for calculation
}

// Main calculation function
function calculate() {
    let calcType = document.getElementById("calcType").value;
    let rate = getInputValue("rate");
    let machineSpeed = getInputValue("machineSpeed");
    let headCount = getInputValue("headCount");
    let efficiency = getInputValue("efficiency") / 100;
    let stitchCount = 0;

    if (calcType === "multiple") {
        stitchCount = getInputValue("totalStitch");
    }

    if (stitchCount <= 0) {
        alert("Please enter a valid stitch count!");
        return;
    }

    let totalCost = (stitchCount / 1000) * rate;
    let totalTime = stitchCount / (machineSpeed * headCount * efficiency);
    let totalHours = totalTime / 60;
    let totalShifts = totalHours / 12;

    document.getElementById("costResult").innerText = `Total Cost: ৳${totalCost.toFixed(2)}`;
    document.getElementById("timeResult").innerText = `Total Time: ${totalTime.toFixed(2)} min (${totalHours.toFixed(2)} hrs)`;
    document.getElementById("shiftResult").innerText = `Shifts Required (12-hour): ${totalShifts.toFixed(2)}`;
}
