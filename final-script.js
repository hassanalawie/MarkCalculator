var goalFinalMark = document.getElementById("final-worth");
var finalExamWorth = document.getElementById("final-worth");
var finalCurrentMark = document.getElementById("current-grade");
var form2 = document.getElementById("goal-mark");

function printconsole(e) {
  console.log("dflnjk");
}

form2.addEventListener("submit", function finalUpdate() {
  finalCurrentMark.innerText =
    (finalCurrentMark.value / 100) * (100 - finalExamWorth.value) +
    (goalFinalMark.value / 100) * finalExamWorth.value;
});
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Exam Mark", "Your Mark"],
    [0, 12],
    [10, 5.5],
    [20, 14],
    [30, 5],
    [40, 3.5],
    [50, 7],
    [60, 7],
    [70, 7],
    [80, 7],
    [90, 7],
    [100, 7],
  ]);

  var options = {
    title: "What Mark do you need",
    hAxis: { title: "Exam Mark", minValue: 0, maxValue: 15 },
    vAxis: { title: "Your Mark", minValue: 0, maxValue: 15 },
    legend: "none",
  };

  var chart = new google.visualization.ScatterChart(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);
}
