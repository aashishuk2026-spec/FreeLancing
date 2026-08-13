$(document).ready(function () {

    "use strict";

    window.validateForm = function () {

        let valid = true;

        const firstName = $("#first-name");
        const lastName = $("#last-name");
        const email = $("#email");
        const phone = $("#phone-number");
        const project = $("#project");
        const budget = $("#project-budget");
        const timeline = $("#project-timeline"); // ✅ Updated selector
        const details = $("#project-details");
        const agreeInfo = $("#agreed-information");
        const agreeContact = $("#agreed-enquiry");

        // Clear previous errors
        $(".form-control, .form-select").removeClass("is-invalid is-valid");
        $("[role='alert']").text("");

        // First name
        if (firstName.val().trim() === "") {
            $("#first-name-error").text("Please enter your first name.");
            firstName.addClass("is-invalid");
            valid = false;
        } else if (!/^[A-Za-z\s'-]+$/.test(firstName.val().trim())) {
            $("#first-name-error").text("First name can only contain letters.");
            firstName.addClass("is-invalid");
            valid = false;
        } else {
            firstName.addClass("is-valid");
        }

        // Last name
        if (lastName.val().trim() === "") {
            $("#last-name-error").text("Please enter your last name.");
            lastName.addClass("is-invalid");
            valid = false;
        } else if (!/^[A-Za-z\s'-]+$/.test(lastName.val().trim())) {
            $("#last-name-error").text("Last name can only contain letters.");
            lastName.addClass("is-invalid");
            valid = false;
        } else {
            lastName.addClass("is-valid");
        }

        // Email
        const emailValue = email.val().trim();
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (emailValue === "") {
            $("#email-error").text("Please enter your email address.");
            email.addClass("is-invalid");
            valid = false;
        } else if (!emailPattern.test(emailValue)) {
            $("#email-error").text("Please enter a valid email address, for example name@gmail.com.");
            email.addClass("is-invalid");
            valid = false;
        } else {
            email.addClass("is-valid");
        }
    
        // Phone - optional
        const phoneValue = phone.val().trim();

        if (phoneValue !== "") {
            const phoneDigits = phoneValue.replace(/\D/g, "");

            if (phoneValue.startsWith("+44")) {
                if (phoneDigits.length !== 12) {
                    $("#phone-number-error").text("A UK number should contain 10 digits after +44.");
                    phone.addClass("is-invalid");
                    valid = false;
                } else {
                    phone.addClass("is-valid");
                }
            } else {
                $("#phone-number-error").text("Please enter a UK number starting with +44.");
                phone.addClass("is-invalid");
                valid = false;
            }
        }

        // Project
        if (project.val() === "") {
            $("#project-error").text("Please choose a project type.");
            project.addClass("is-invalid");
            valid = false;
        } else {
            project.addClass("is-valid");
        }

        // Budget
        if (budget.val() === "") {
            $("#project-budget-error").text("Please choose your project budget.");
            budget.addClass("is-invalid");
            valid = false;
        } else {
            budget.addClass("is-valid");
        }

        // Timeline (Updated logic & error selector)
        if (timeline.val() === "") {
            $("#project-timeline-error").text("Please choose your preferred project timeline.");
            timeline.addClass("is-invalid");
            valid = false;
        } else {
            timeline.addClass("is-valid");
        }

        // Project details
        const detailValue = details.val().trim();

        if (detailValue === "") {
            $("#project-details-error").text("Please tell us about your project.");
            details.addClass("is-invalid");
            valid = false;
        } else if (detailValue.length > 1000) {
            $("#project-details-error").text("Project details cannot exceed 1000 characters.");
            details.addClass("is-invalid");
            valid = false;
        } else {
            details.addClass("is-valid");
        }

        // Agreement 1
        if (!agreeInfo.is(":checked")) {
            $("#agreed-info-error").text("Please confirm that the information provided is accurate.");
            agreeInfo.addClass("is-invalid");
            valid = false;
        }

        // Agreement 2
        if (!agreeContact.is(":checked")) {
            $("#agreed-enquiry-error").text("Please agree to be contacted about this enquiry.");
            agreeContact.addClass("is-invalid");
            valid = false;
        }

        return valid;
    };

});