$(document).ready(function () {

    "use strict";

    // Grab the main form and all the fields we need
    const form = $("form");
    const details = $("#project-details");
    const messageCount = $("#message-count");
    const status = $("#enquiry-status");
    const resetButton = form.find("button[type='button']");


    // Highlight the field blue when hovering, clicking, or typing
    $(".form-control, .form-select").on("mouseenter focus input", function () {
        this.style.setProperty("background-color", "#e7f1ff", "important");
        this.style.setProperty("border-color", "#0d6efd", "important");
        $(this).css({
            "transform": "translateY(-2px)",
            "box-shadow": "0 7px 18px rgba(13,110,253,.18)"
        });
    });


    // Reset color when mouse moves away if the box is empty
    $(".form-control, .form-select").on("mouseleave blur", function () {
        const field = $(this);

        if (!field.is(":focus")) {
            $(this).css({
                "transform": "translateY(0)",
                "box-shadow": ""
            });
        }

        if (!field.is(":focus") && field.val().trim() === "") {
            this.style.removeProperty("background-color");
            this.style.removeProperty("border-color");
        }
    });


    // Update the character counter for the details box
    function updateCharacterCount() {

        const length = details.val().length;

        messageCount.text(length + " / 1000 characters");

        // Turn counter red if user gets close to the limit
        if (length >= 900) {
            messageCount.css("color", "#dc3545");
        } else {
            messageCount.css("color", "#64748b");
        }
    }


    // Run counter check every time the user types
    details.on("input", function () {
        updateCharacterCount();
    });


    // Show green success box after sending
    function showSuccessMessage() {

        status
            .hide()
            .removeClass("text-danger")
            .addClass("text-success")
            .css({
                "background-color": "#d1e7dd",
                "color": "#0f5132",
                "padding": "15px",
                "border-radius": "10px"
            })
            .html("Your enquiry has been submitted successfully. We will respond within 2 working days.")
            .fadeIn(400);

        // Focus on the message for screen readers
        status.attr("tabindex", "-1");
        status.trigger("focus");
    }


    // Show red error message if form is missing stuff
    function showFormError() {

        status
            .hide()
            .removeClass("text-success")
            .addClass("text-danger")
            .css({
                "background-color": "#f8d7da",
                "color": "#842029",
                "padding": "15px",
                "border-radius": "10px"
            })
            .html("Please correct the errors in the form before submitting.")
            .fadeIn(400);

        // Focus on error message for screen readers
        status.attr("tabindex", "-1");
        status.trigger("focus");
    }

    // Handle form submission
form.on("submit", function (event) {

    event.preventDefault();

    // Check the form before saving it
    const formIsValid = window.validateForm();

    if (formIsValid) {

        // Save the completed enquiry
        window.saveForm(true);

        // Tell the user that the enquiry was submitted
        showSuccessMessage();

        // Remove validation borders
        $(".form-control, .form-select, .form-check-input")
            .removeClass("is-valid is-invalid");

        // Small submission animation
        form.addClass("form-submitted");

        setTimeout(function () {
            form.removeClass("form-submitted");
        }, 700);

    } else {

        // Show an error message
        showFormError();

    }

});

// Reset the form
resetButton.on("click", function () {

    // Clear everything in the form
    form[0].reset();

    // Remove validation colours
    $(".form-control, .form-select, .form-check-input")
        .removeClass("is-valid is-invalid");

    // Remove all error messages
    $("[role='alert']").text("");

    // Remove the success or error message
    status
        .removeClass("text-success text-danger")
        .hide()
        .text("");

    // Reset the character counter
    updateCharacterCount();

    // Remove the saved form data
    if (typeof window.clearSavedForm === "function") {
        window.clearSavedForm();
    }

});

});