$(document).ready(function () {

    "use strict";

    const $contrastBtn = $("#contrast-toggle-btn");
    
    // checks if the user hat prevoiusly rurend on high contrast or not
    if (localStorage.getItem("site_contrast") === "high") {
        $("body").addClass("high-contrast");
        $contrastBtn.text("👁️ Normal Contrast");
    }

    // High constrast after click
    $contrastBtn.on("click", function() {
        $("body").toggleClass("high-contrast");
        
        if ($("body").hasClass("high-contrast")) {
            localStorage.setItem("site_contrast", "high");
            $(this).text("👁️ Normal Contrast");
        } else {
            localStorage.setItem("site_contrast", "normal");
            $(this).text("👁️ High Contrast");
        }
    });

    // Take the main form
    const form = $("form");
    const details = $("#project-details");
    const messageCount = $("#message-count");
    const status = $("#enquiry-status");
    const resetButton = form.find("button[type='button'], button[type='reset']");

    // Interactive styling to forms
    $(".form-control, .form-select").on("mouseenter focus input", function () {
        this.style.setProperty("background-color", "#e7f1ff", "important");
        this.style.setProperty("border-color", "#0d6efd", "important");
        $(this).css({
            "transform": "translateY(-2px)",
            "box-shadow": "0 7px 18px rgba(13,110,253,.18)"
        });
    });

    // Reset color when mouse leave if it is empty
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

    // Updating character counter
    function updateCharacterCount() {
        const length = details.val() ? details.val().length : 0;
        messageCount.text(length + " / 1000 characters");

        if (length >= 900) {
            messageCount.css("color", "#dc3545");
        } else {
            messageCount.css("color", "#64748b");
        }
    }

    // Run counter check on typing
    details.on("input", function () {
        updateCharacterCount();
    });

    // Show red error alerts in form
    function showFormError() {
        status
            .stop(true, true)
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

        status.attr("tabindex", "-1");
        status.trigger("focus");
    }

    // Pressing Enter key jumps to another feild
    form.on("keydown", "input, select", function (e) {
        if (e.key === "Enter") {
            const fields = form.find("input:visible, select:visible, textarea:visible, button[type='submit']:visible");
            const currentIndex = fields.index(this);

            if (currentIndex < fields.length - 1) {
                e.preventDefault();
                fields.eq(currentIndex + 1).focus();
            }
        }
    });

    // Handles form submission
    form.on("submit", function (event) {
        event.preventDefault();

        // Checks saftey of validation
        const formIsValid = (typeof window.validateForm === "function") ? window.validateForm() : true;

        if (formIsValid) {
            // 1. Read and trim all input values FIRST before resetting
            const firstNameVal = $.trim($("#first-name").val());
            const lastNameVal = $.trim($("#last-name").val());
            const emailVal = $.trim($("#email").val());
            const projectVal = $.trim($("#project").val());
            const budgetVal = $.trim($("#project-budget").val());
            const detailsVal = $.trim(details.val());

            const fullName = (firstNameVal || lastNameVal) ? `${firstNameVal} ${lastNameVal}`.trim() : "N/A";

            const completedEnquiry = {
                name: fullName,
                email: emailVal || "N/A",
                phone: $.trim($("#phone-number").val()) || "N/A",
                project: projectVal || "N/A",
                budget: budgetVal || "N/A",
                timeline: $.trim($("#project-timeline").val()) || "N/A",
                details: detailsVal
            };

            // 2. Saces submission to local storage
            if (typeof window.saveSubmittedEnquiry === "function") {
                window.saveSubmittedEnquiry(completedEnquiry);
            }

            // Generates and saves autoamted mail locally
            if (typeof window.logLocalConfirmationEmail === "function") {
                window.logLocalConfirmationEmail(completedEnquiry);
            }

            // clears the draft form data storage
            if (typeof window.clearSavedForm === "function") {
                window.clearSavedForm();
            }
            localStorage.removeItem("gg_enquiry");

            // Retrive updated list from stored submissions
            const allSubmissions = (typeof window.getValidSubmissions === "function") 
                ? window.getValidSubmissions() 
                : [];

            // Display sucess message when submitted sucessfully
            status
                .stop(true, true)
                .removeClass("text-danger d-none")
                .addClass("text-success")
                .css({
                    "display": "block",
                    "background-color": "#d1e7dd",
                    "color": "#0f5132",
                    "padding": "15px",
                    "border-radius": "10px",
                    "margin-bottom": "20px"
                })
                .html(`
                    <strong style="font-size: 1.05rem;">Enquiry Submitted Successfully!</strong><br>
                    <small>Stored in session log (Total Active: ${allSubmissions.length})</small>
                    <hr class="my-2" style="border-color: #a3cfbb;">
                    <strong>Latest Submitted Details:</strong>
                    <ul class="mb-0 text-start ps-3" style="font-size: 0.9rem;">
                        <li><strong>Name:</strong> ${completedEnquiry.name}</li>
                        <li><strong>Email:</strong> ${completedEnquiry.email}</li>
                        <li><strong>Project:</strong> ${completedEnquiry.project}</li>
                        <li><strong>Budget:</strong> ${completedEnquiry.budget}</li>
                    </ul>
                `)
                .hide()
                .fadeIn(400);

            // Reset input feilds and clears draft
            form[0].reset();
            details.val("");

            if (typeof window.clearSavedForm === "function") {
                window.clearSavedForm();
            }
            localStorage.removeItem("gg_enquiry");

            $(".form-control, .form-select, .form-check-input")
                .removeClass("is-valid is-invalid")
                .css({ "background-color": "", "border-color": "", "transform": "", "box-shadow": "" });

            $("[role='alert']").text("");
            updateCharacterCount();

            // Automatically removes sucess notification 
            setTimeout(function () {
                status.fadeOut(500)
            }, 30000);

            // Return focus to first name field
            $("#first-name").focus();

        } else {
            showFormError();
        }

    });

    // Resetsvand clears form
    resetButton.on("click", function () {
        form[0].reset();
        details.val("");

        $(".form-control, .form-select, .form-check-input")
            .removeClass("is-valid is-invalid")
            .css({ "background-color": "", "border-color": "", "transform": "", "box-shadow": "" });

        $("[role='alert']").text("");

        status
            .stop(true, true)
            .removeClass("text-success text-danger")
            .hide()
            .html("");

        updateCharacterCount();

        if (typeof window.clearSavedForm === "function") {
            window.clearSavedForm();
        }
    });

});