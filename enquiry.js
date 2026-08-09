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


    // Handle what happens when clicking submit
    form.on("submit", function (event) {

        event.preventDefault();

        // Check validation rules from validation.js
        const formIsValid = window.validateForm();

        if (formIsValid) {

            // Save form data using storage.js
            window.saveForm(true);

            // Show green success alert
            showSuccessMessage();

            // Clear out all typed inputs
            form[0].reset();

            // Clear our blue highlight colors
            $(".form-control, .form-select").each(function () {
                this.style.removeProperty("background-color");
                this.style.removeProperty("border-color");
            });

            // Remove red/green borders from validation
            $(".form-control, .form-select").removeClass("is-valid is-invalid");

            // Put counter back to zero
            updateCharacterCount();

            // Small animation effect on submit
            form.addClass("form-submitted");
            setTimeout(function () {
                form.removeClass("form-submitted");
            }, 700);

        } else {

            // Show error message if validation fails
            showFormError();

        }

    });
});