function calculate() {
    let stitchCount = parseFloat(document.getElementById("stitchCount").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let machineSpeed = parseFloat(document.getElementById("machineSpeed").value);
    let headCount = parseFloat(document.getElementById("headCount").value);
    let efficiency = parseFloat(document.getElementById("efficiency").value) / 100;

    if (isNaN(stitchCount) || stitchCount <= 0) {
        alert("Please enter a valid stitch count!");
        return;
    }

    // Calculate cost
    let totalCost = (stitchCount / 1000) * rate;

    // Calculate time in minutes
    let totalTime = stitchCount / (machineSpeed * headCount * efficiency);
    
    // Convert time to hours and shifts
    let totalHours = totalTime / 60;
    let totalShifts = totalHours / 12;

    // Display results
    document.getElementById("costResult").innerText = `Total Cost: ৳${totalCost.toFixed(2)}`;
    document.getElementById("timeResult").innerText = `Total Time: ${totalTime.toFixed(2)} minutes (${totalHours.toFixed(2)} hours)`;
    document.getElementById("shiftResult").innerText = `Shifts Required (12-hour): ${totalShifts.toFixed(2)}`;
}
