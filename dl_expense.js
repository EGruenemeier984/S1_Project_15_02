"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Ethan Gruenemeier
   Date: 4.19.19  
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/
// This runs an anonymous function on load.
window.addEventListener("load", function () {
    // establishes a var that gets all the input tags in the travelEXP table that has the sum class.
    var changingCells = document.querySelectorAll("table#travelExp input.sum");
    // loops through the sum cells and iterates by 1
    for (var i = 0; i < changingCells.length; i++) {
        // adds an event listener to each sum cell to run the calc function on change.
        changingCells[i].addEventListener("change", calcExp);
    }
    // This runs the validateSummary function on click.
    document.getElementById("submitButton").onclick = validateSummary;
});
// This function checks to see if the textarea with the id of summary is empty and if it is then it pops up a custom validation message. 
function validateSummary() {
    var summary = document.getElementById("summary");
    if (summary.validity.valueMissing) {
        summary.setCustomValidity("You must include a summary of the trip in your report");
    } else {
        summary.setCustomValidity("");
    }
}
// This function returns the total cost and does it by getting the sum class and loops through each field that displays a sum and adds an items value to it while ignoring the values that are not numbers.
function calcClass(sumClass) {
    var sumFields = document.getElementsByClassName(sumClass);
    var sumTotal = 0;
    for (var i = 0; i < sumFields.length; i++) {
        var itemValue = parseFloat(sumFields[i].value);
        if (!isNaN(itemValue)) {
            sumTotal += itemValue
        }
    }
    return sumTotal;
}
// This function gets all the table rows in the travelExp table and loops throght them while obtaining the value and using the provided function to format them into a dollar amount (2 decimal places).
function calcExp() {
    var expTable = document.querySelectorAll("table#travelExp tbody tr");
    for (var i = 0; i < expTable.length; i++) {
        expTable[i].querySelector("input#subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
    }
    // This formats each input value as the user types it in to the site.
    document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
    document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
    document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
    document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);
    document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}

// provided functions
function formatNumber(val, decimals) {
    return val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function formatUSCurrency(val) {
    return val.toLocaleString('en-US', {
        style: "currency",
        currency: "USD"
    });
}