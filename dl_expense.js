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

window.addEventListener("load", function () {
    var changingCells = document.querySelectorAll("table#travelExp input.sum");
    for (var i = 0; i < changingCells.length; i++) {
        changingCells[i].addEventListener("change", calcExp());
    }
    document.getElementById("submitButton").addEventListener("click", validateSummary);
});

function validateSummary() {
    if (document.getElementById("summary").validity.valueMissing) {
        document.getElementById("summary").setCustomValidity("You must include a summary of the trip in your report");
    } else {
        document.getElementById("summary").setCustomValidity("");
    }
}

function calcClass(sumClass) {
    var sumFields = document.getElementsByClassName(sumClass);
    var sumTotal = 0;
    for (var i = 0; i < sumFields.length; i++) {
        var itemValue = parseFloat(sumFields[i]);
        if (isNaN(itemValue) === false) {
            sumTotal += itemValue
        }
    }
    return sumTotal
}

function calcExp() {
    var expTable = document.querySelectorAll("table#travelExp tbody tr");
    for (var i = 0; i < expTable.length; i++) {
        document.getElementById("subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
    }
    document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
    document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
    document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
    document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);
    document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}

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