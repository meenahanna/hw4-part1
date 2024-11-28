/*
Name: Mena Hanna
File: script.js
Date: 11/27/2024

GUI Assignment: Creating an Interactive Dynamic Table - Part One
Mena Hanna, UMass Lowell Computer Science, mena_hanna@student.uml.edu
Copyright (c) 2024 by Mena Hanna. All rights reserved.
May be freely copied or excerpted for educational purposes with credit to the author.

Description:
This JavaScript file uses jQuery to read user inputs, validate them using the jQuery Validation plugin,
and generate a multiplication table based on those inputs. The table is dynamically generated within the specified
HTML container. Tabs are not included as this is only Part One of the assignment.

Sources:
- jQuery Validation Plugin documentation: https://jqueryvalidation.org/
*/

$(document).ready(function () {
    // Custom validation method to check if a value is greater than or equal to another value
    $.validator.addMethod("greaterThanOrEqualTo", function (value, element, param) {
        var target = $(param);
        if (this.settings.onfocusout) {
            target.off(".validate-greaterThanOrEqualTo").on("blur.validate-greaterThanOrEqualTo", function () {
                $(element).valid();
            });
        }
        return parseFloat(value) >= parseFloat(target.val());
    }, "The maximum value must be greater than or equal to the minimum value.");

    // Initialize form validation using jQuery Validation Plugin
    $("#form-container").validate({
        rules: {
            min_col_value: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            max_col_value: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                greaterThanOrEqualTo: "#min_col_value" // Custom validation to ensure max is greater or equal to min
            },
            min_row_value: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            max_row_value: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                greaterThanOrEqualTo: "#min_row_value" // Custom validation to ensure max is greater or equal to min
            }
        },
        messages: {
            min_col_value: {
                required: "Please enter a minimum column value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be no greater than 50."
            },
            max_col_value: {
                required: "Please enter a maximum column value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be no greater than 50.",
                greaterThanOrEqualTo: "Maximum column value must be greater than or equal to the minimum column value."
            },
            min_row_value: {
                required: "Please enter a minimum row value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be no greater than 50."
            },
            max_row_value: {
                required: "Please enter a maximum row value.",
                number: "Please enter a valid number.",
                min: "Value must be at least -50.",
                max: "Value must be no greater than 50.",
                greaterThanOrEqualTo: "Maximum row value must be greater than or equal to the minimum row value."
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element); // Place error messages right after each input field
        }
    });

    // Attach event listener for generating the table
    $("#generate-table-button").click(function (e) {
        e.preventDefault(); // Prevent page from reloading on error
        if ($("#form-container").valid()) {
            generateTable(); // Generate the table if form is valid
        }
    });
    function generateTable() {
        // Get user inputs from the form
        var minCol = parseInt($("#min_col_value").val());
        var maxCol = parseInt($("#max_col_value").val());
        var minRow = parseInt($("#min_row_value").val());
        var maxRow = parseInt($("#max_row_value").val());
    
        // Start generating the HTML content for the table
        var output = "<tr><th class='no-border'></th>"; // Create the top-left empty corner
    
        // Create top header row for columns
        for (var col = minCol; col <= maxCol; col++) {
            output += "<th>" + col + "</th>";
        }
        output += "</tr>";
    
        // Generate rows for the multiplication table
        for (var row = minRow; row <= maxRow; row++) {
            output += "<tr><th>" + row + "</th>"; // Add row header
            for (var col = minCol; col <= maxCol; col++) {
                output += "<td>" + (row * col) + "</td>";
            }
            output += "</tr>";
        }
    
        // Add the generated table to the container
        $("#mytable").html(output);
    }
    
});

