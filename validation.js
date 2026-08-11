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
    }

});