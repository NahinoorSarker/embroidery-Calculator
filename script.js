function toggleFields() {
    let calcType = document.getElementById("calcType").value;
    document.getElementById("stitchOptions").style.display = (calcType === "stitch") ? "block" : "none";
    document.getElementById("yardFields").style.display = (calcType === "yard") ? "block" : "none";
    document.getElementById("multipleFields").style.display = (calcType === "multiple") ? "block" : "none";
    toggleStitchFields();
}

function toggleStitchFields() {
    let stitchMethod = document.getElementById("stitchMethod").value;
    document.getElementById("totalStitchFields").style.display = (stitchMethod === "total") ? "block" : "none";
    document.getElementById("pieceFields").style.display = (stitchMethod === "piece") ? "block" : "none";
}

function addStitchField() {
    let div = document.createElement("div");
    div.innerHTML = `<label>Extra Stitch per Piece:</label><input type="number" class="stitchInput" value="0">`;
    document.getElementById("stitchInputs").appendChild(div);
}

function getInputValue(id) {
    let value = parseFloat(document.getElementById(id).value);
    return isNaN(value) || value < 0 ? 0 : value;
}

function calculate() {
    let calcType = document.getElementById("calcType").value;
    let rate = getInputValue("rate");
    let machineSpeed = getInputValue("machineSpeed");
    let headCount = getInputValue("headCount");
    let efficiency = getInputValue("efficiency") / 100;
    let stitchCount = 0;

    if (calcType === "multiple") {
        let totalPieces = getInputValue("totalPieces");
        let stitchInputs = document.querySelectorAll(".stitchInput");
        let totalStitchPerPiece = 0;
        stitchInputs.forEach(input => totalStitchPerPiece += getInputValue(input.id));
        stitchCount = totalStitchPerPiece * totalPieces;
        document.getElementById("pieceStitchResult").innerText = `Total Stitch per Piece: ${totalStitchPerPiece}`;
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
