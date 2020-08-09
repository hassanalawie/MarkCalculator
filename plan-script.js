// Plan // // // // // // // // // // // // // // // // // // // // //
var planAssignmentName = document.getElementById("plan-assignment-name");
var planAssignmentMark = document.getElementById("plan-assignment-mark");
var planAssignmentWorth = document.getElementById("plan-assignment-worth");
var editButton = document.getElementById("edit-row");
var table = document.getElementById("table");
var form = document.getElementById("addform");
var currentMark = document.getElementById("currentMark");
var excel = document.getElementById("excel-button");

var planMarkSum = 0;
var planMarkSum2 = 0;
var planMarks = [];
var planWorthSum = 0;
var planWorths = [];
var numberOfItems = 0;
var z = 0;

//
//
//
//
//
//

function planAddItem(e) {
  e.preventDefault();
  //Pulling input values into varibales
  var planNewItemName = planAssignmentName.value;
  var planNewItemMark = planAssignmentMark.value;
  var planNewItemWorth = planAssignmentWorth.value;
  planMarkSum = parseInt(planMarkSum) + parseInt(planNewItemMark);
  planWorthSum = parseInt(planWorthSum) + parseInt(planNewItemWorth);

  //
  //
  //

  if (planWorthSum <= 100) {
    planMarks.push(planAssignmentMark.value);
    planWorths.push(planAssignmentWorth.value);
    //
    //
    //
    //

    //Current Mark Update
    var currentSum = planWorthSum;

    for (let i = 0; i < planMarks.length; i++) {
      var M = parseInt(planMarks[i]);
      var W = parseInt(planWorths[i]);
      var deduct = W - (M / 100) * W;
      currentSum = currentSum - deduct;
    }
    var currentMarkValue = (currentSum / planWorthSum) * 100;
    currentMark.innerText = `Current Mark: ${currentMarkValue.toFixed(2)}`;

    //
    //
    //
    //

    //Creating tr and a td for name mark and worth
    var tr = document.createElement("tr");
    var tdN = document.createElement("td");
    tdN.className = "text-center assignment-name";
    tdN.id = "assignment-name";
    var tdM = document.createElement("td");
    tdM.className = "text-center assignment-mark";
    tdM.id = "assignment-mark";
    var tdW = document.createElement("td");
    tdW.className = "text-center assignment-worth";
    tdW.id = "assignment-worth";

    //Adding DELETE button
    tdB = document.createElement("td");
    tdB.className = "text-center";
    var planDeleteBtn = document.createElement("button");
    planDeleteBtn.appendChild(document.createTextNode("⌫"));
    planDeleteBtn.className = "delete";
    tdB.appendChild(planDeleteBtn);

    // //Adding EDIT button
    // tdE = document.createElement("td");
    // tdE.className = "text-center";
    // var planEditBtn = document.createElement("button");
    // planEditBtn.appendChild(document.createTextNode("✎"));
    // planEditBtn.className = "edit";
    // tdE.appendChild(planEditBtn);

    //Appending input value to the td
    tdN.appendChild(document.createTextNode(planNewItemName));
    tdM.appendChild(document.createTextNode(planNewItemMark));
    tdW.appendChild(document.createTextNode(planNewItemWorth));

    //Appending the tds to the tr
    tr.appendChild(tdN);
    tr.appendChild(tdM);
    tr.appendChild(tdW);
    tr.appendChild(tdB);
    // tr.appendChild(tdE);

    //appending the tr into the table
    table.appendChild(tr);

    //
    //
    //
    return (numberOfItems = numberOfItems + 1);
  } else {
    alert(
      `Total worth must be less than 100, the current total worth is ${planWorthSum}`
    );
    planWorthSum = planWorthSum - parseInt(planNewItemWorth);
  }
}

//
//
//
//

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var td = e.target.parentElement;
      var tr = td.parentElement;

      var gettingLostMarkCell = tr.getElementsByClassName("assignment-mark")[0];
      var gettingLostMark = `${gettingLostMarkCell.innerText}`;
      var gettingLostWorthCell = tr.getElementsByClassName(
        "assignment-worth"
      )[0];
      var gettingLostWorth = `${gettingLostWorthCell.innerText}`;

      //
      //
      var currentSum = planWorthSum;
      for (let i = 0; i < planMarks.length; i++) {
        var M = parseInt(planMarks[i]);
        var W = parseInt(planWorths[i]);
        var deduct = W - (M / 100) * W;
        currentSum = currentSum - deduct;
      }

      planWorthSum = planWorthSum - parseInt(gettingLostWorth);

      currentSum =
        currentSum -
        gettingLostWorth +
        (gettingLostWorth - (gettingLostMark / 100) * gettingLostWorth);
      currentMarkValue = (currentSum / planWorthSum) * 100;
      currentMark.innerText = `Current Mark: ${currentMarkValue.toFixed(2)}`;

      table.removeChild(tr);
      return (numberOfItems = numberOfItems - 1);

      //
      //
    }
  }
  //
  //
  //
  //
  //
}

function exportTableToExcel(tableID, filename = "") {
  var downloadLink;
  var dataType = "application/vnd.ms-excel";
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");
  console.log(planMarks.length);

  tableHTML = tableHTML.replace(/⌫/g, "");
  tableHTML = tableHTML.replace(/✎/g, "");

  tableHTML = tableHTML + currentMark.innerText;

  // Specify file name
  filename = filename ? filename + ".xls" : "excel_data.xls";

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(["\ufeff", tableHTML], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = "data:" + dataType + ", " + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }
}

// function editItem(e) {
//   e.preventDefault();
//   var nameNodeList = document.querySelectorAll(".assignment-name");
//   var markNodeList = document.querySelectorAll(".assignment-mark");
//   var worthNodeList = document.querySelectorAll(".assignment-worth");
//   if (e.target.classList.contains("edit")) {
//     editButton.style.display = "block";
//     var td = e.target.parentElement;
//     var tr = td.parentElement;
//     var editedName = tr.getElementsByClassName("assignment-name")[0].innerText;
//     var editedMark = tr.getElementsByClassName("assignment-mark")[0].innerText;
//     var editedWorth = tr.getElementsByClassName("assignment-worth")[0]
//       .innerText;
//     editButton.addEventListener("click", function replaceItem() {
//       var newName = planAssignmentName.value;
//       var newMark = planAssignmentMark.value;
//       var newWorth = planAssignmentWorth.value;

//       planAssignmentName.value =

//       tr.getElementsByClassName("assignment-name")[0].innerText = newName;
//       tr.getElementsByClassName("assignment-mark")[0].innerText = newMark;
//       tr.getElementsByClassName("assignment-worth")[0].innerText = newWorth;
//     });
//   }
//   if (e.target.classList.contains("edit")) {
//     editButton.style.display = "block";
//     var td = e.target.parentElement;
//     var tr = td.parentElement;
//     console.log(tr);
//     var gettingEditNameCell = tr.getElementsByClassName("assignment-name")[0];
//     var gettingEditName = `${gettingEditNameCell.innerText}`;
//     var gettingEditMarkCell = tr.getElementsByClassName("assignment-mark")[0];
//     var gettingEditMark = `${gettingEditMarkCell.innerText}`;

//     var index = planMarks.indexOf(gettingEditMarkCell.innerText);
//     if (index > -1) {
//       planMarks.splice(index, 1);
//     }
//     var gettingEditWorthCell = tr.getElementsByClassName("assignment-worth")[0];
//     var gettingEditWorth = `${gettingEditWorthCell.innerText}`;
//     var index = planWorths.indexOf(gettingEditWorthCell.innerText);
//     if (index > -1) {
//       planWorths.splice(index, 1);
//     }

//     planAssignmentName.value = gettingEditName;
//     planAssignmentMark.value = gettingEditMark;
//     planAssignmentWorth.value = gettingEditWorth;
//     console.log(planMarks);
//     console.log(planWorths);
//     console.log("object");

//     editButton.addEventListener("click", function replaceItem() {
//       gettingEditNameCell.innerText = planAssignmentName.value;

//       gettingEditMarkCell.innerText = planAssignmentMark.value;
//       planMarks.push(planAssignmentMark.value);

//       gettingEditWorthCell.innerText = planAssignmentWorth.value;
//       planWorths.push(planAssignmentWorth.value);

//       //
//       //
//       //
//       //
//       //
//       //
//       //
//       //
//       //

//       planWorthSum =
//         planWorthSum -
//         parseInt(gettingEditWorth) +
//         parseInt(planAssignmentWorth.value);
//       console.log(planWorthSum);
//       var currentSum = planWorthSum;
//       if (z < 1) {
//         planMarks.pop();
//         planWorths.pop();
//       }
//       for (let i = 0; i < planMarks.length; i++) {
//         var M = parseInt(planMarks[i]);
//         var W = parseInt(planWorths[i]);
//         var deduct = W - (M / 100) * W;
//         currentSum = currentSum - deduct;
//       }

//       currentMarkValue = (currentSum / planWorthSum) * 100;
//       currentMark.innerText = `Current Mark: ${currentMarkValue.toFixed(2)}`;
//       currentMarkValue = 0;
//       editButton.style.display = "none";
//       z = z + 1;
//       console.log(planMarks);
//       console.log(planWorths);
//     });
//   }
// }

form.addEventListener("submit", planAddItem);

table.addEventListener("click", removeItem);

// table.addEventListener("click", editItem);
// editButton.style.display = "none";
