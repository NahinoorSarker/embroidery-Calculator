document.addEventListener("DOMContentLoaded", function () {
    toggleFields();
});

function toggleFields() {
    let calcType = document.getElementById("calcType").value;

    document.getElementById("stitchOptions").style.display = "none";
    document.getElementById("totalStitchFields").style.display = "none";
    document.getElementById("pieceFields").style.display = "none";
    document.getElementById("yardFields").style.display = "none";
    document.getElementById("multipleFields").style.display = "none";

    if (calcType === "stitch") {
        document.getElementById("stitchOptions").style.display = "block";
        toggleStitchFields();
    } else if (calcType === "yard") {
        document.getElementById("yardFields").style.display = "block";
    } else if (calcType === "multiple") {
        document.getElementById("multipleFields").style.display = "block";
    }
}

function toggleStitchFields() {
    let stitchMethod = document.getElementById("stitchMethod").value;

    document.getElementById("totalStitchFields").style.display = "none";
    document.getElementById("pieceFields").style.display = "none";

    if (stitchMethod === "total") {
        document.getElementById("totalStitchFields").style.display = "block";
    } else if (stitchMethod === "piece") {
        document.getElementById("pieceFields").style.display = "block";
    }
}

function addStitchField() {
    let div = document.createElement("div");
    div.classList.add("extra-stitch-field");
    div.innerHTML = `<label>Extra Stitch per Piece:</label>
                     <input type="number" class="stitchInput" placeholder="Enter extra stitches" oninput="updateTotalStitch()">`;
    document.getElementById("stitchInputs").appendChild(div);
}

function updateTotalStitch() {
    let total = 0;
    document.querySelectorAll(".stitchInput").forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    document.getElementById("totalStitchDisplay").innerText = total;
}

function calculate() {
    let calcType = document.getElementById("calcType").value;
    let rate = parseFloat(document.getElementById("rate").value);
    let machineSpeed = parseFloat(document.getElementById("machineSpeed").value);
    let headCount = parseFloat(document.getElementById("headCount").value);
    let efficiency = parseFloat(document.getElementById("efficiency").value) / 100;
    let stitchCount = 0;

    if (calcType === "stitch") {
        let stitchMethod = document.getElementById("stitchMethod").value;
        if (stitchMethod === "total") {
            stitchCount = parseFloat(document.getElementById("stitchCount").value);
        } else if (stitchMethod === "piece") {
            let stitchPerPiece = parseFloat(document.getElementById("stitchPerPiece").value);
            let pieceCount = parseFloat(document.getElementById("pieceCount").value);
            stitchCount = stitchPerPiece * pieceCount;
        }
    } else if (calcType === "yard") {
        let stitchPerYard = parseFloat(document.getElementById("stitchPerYard").value);
        let yardCount = parseFloat(document.getElementById("yardCount").value);
        stitchCount = stitchPerYard * yardCount;
    } else if (calcType === "multiple") {
        let totalStitchPerPiece = parseFloat(document.getElementById("totalStitchDisplay").innerText);
        let totalPieces = parseFloat(document.getElementById("totalPieces").value);
        stitchCount = totalStitchPerPiece * totalPieces;
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
    document.getElementById("timeResult").innerText = `Total Time: ${totalTime.toFixed(2)} min (${totalHours.toFixed(2)} hrs)`;
    document.getElementById("shiftResult").innerText = `Shifts Required (12-hour): ${totalShifts.toFixed(2)}`;
}
