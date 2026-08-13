$(document).ready(function () {

    "use strict";

    // Form fields
    const firstName = $("#first-name");
    const lastName = $("#last-name");
    const email = $("#email");
    const phone = $("#phone-number");
    const project = $("#project");
    const budget = $("#project-budget");
    const timeline = $("#project-timeline");
    const details = $("#project-details");
    const agreeInfo = $("#agreed-information");
    const agreeContact = $("#agreed-enquiry");

    // Storage key
    const storageKey = "gg_enquiry";

    // Save form on window
    window.saveForm = function (isSubmitted = false) {
        const enquiryData = {
            first: firstName.val(),
            last: lastName.val(),
            email: email.val(),
            phone: phone.val(),
            project: project.val(),
            budget: budget.val(),
            timeline: timeline.val(),
            details: details.val(),
            agreeInfo: agreeInfo.is(":checked"),
            agreeContact: agreeContact.is(":checked"),
            submitted: isSubmitted
        };

        localStorage.setItem(storageKey, JSON.stringify(enquiryData));
    };

    // Loads form on window
    window.loadForm = function () {
        const savedData = localStorage.getItem(storageKey);

        if (!savedData) {
            return;
        }

        try {
            const enquiryData = JSON.parse(savedData);

            // Don't reload data if submitted
            if (enquiryData.submitted) {
                return;
            }

            firstName.val(enquiryData.first || enquiryData.firstName || "");
            lastName.val(enquiryData.last || enquiryData.lastName || "");
            email.val(enquiryData.email || "");
            phone.val(enquiryData.phone || "");
            project.val(enquiryData.project || "");
            budget.val(enquiryData.budget || "");
            timeline.val(enquiryData.timeline || "");
            details.val(enquiryData.details || enquiryData.projectDetails || "");
            agreeInfo.prop("checked", enquiryData.agreeInfo || false);
            agreeContact.prop("checked", enquiryData.agreeContact || false);
        } catch (e) {
            console.error("Error reading saved form data:", e);
        }
    };

    // Clear saved form on window
    window.clearSavedForm = function () {
        localStorage.removeItem(storageKey);
    };

    // Saves the prevoius data and laods it
    loadForm();
    $("form").on("input change", "input, select, textarea", function () {
        window.saveForm(false);
    });

    // Data expires in 24 hrs
    const EXPIRY_TIME_MS = 12 * 60 * 60 * 1000;

    // Expires same submission and email together 
    window.getValidSubmissions = function () {
        try {
            const now = Date.now();

            // Checks expire form submission
            const rawSubmissions = localStorage.getItem("gg_submitted_list");
            const subList = rawSubmissions ? JSON.parse(rawSubmissions) : [];
            const validSubmissions = subList.filter(item => item && item.expiresAt && item.expiresAt > now);
            localStorage.setItem("gg_submitted_list", JSON.stringify(validSubmissions));

            // Checks expire email and recor
            const rawEmails = localStorage.getItem("gg_sent_emails");
            const emailList = rawEmails ? JSON.parse(rawEmails) : [];
            const validEmails = emailList.filter(item => item && item.expiresAt && item.expiresAt > now);
            localStorage.setItem("gg_sent_emails", JSON.stringify(validEmails));

            return validSubmissions;
        } catch (e) {
            console.error("Error clearing expired storage data", e);
            return [];
        }
    };

    // Saves form submission with unique ID
    window.saveSubmittedEnquiry = function (enquiryData) {
        const activeSubmissions = window.getValidSubmissions();

        // Cleans short ID
        const submissionId = "SUB-" + (activeSubmissions.length + 1);
        const sharedExpiry = Date.now() + EXPIRY_TIME_MS;

        const newEntry = {
            submissionId: submissionId,
            ...enquiryData,
            submittedAt: new Date().toLocaleString(),
            expiresAt: sharedExpiry
        };

        activeSubmissions.push(newEntry);
        localStorage.setItem("gg_submitted_list", JSON.stringify(activeSubmissions));

        // Automatice links email with ID
        window.logLocalConfirmationEmail(newEntry);
    }

    // Links confirmation email records in local storage
    window.logLocalConfirmationEmail = function (submission) {
        const localEmails = JSON.parse(localStorage.getItem("gg_sent_emails")) || [];

        const newEmail = {
            emailId: "MAIL-" + Date.now(),
            linkedSubmissionId: submission.submissionId,
            recipientEmail: submission.email,
            recipientName: submission.name,
            projectRequested: submission.project,
            budgetListed: submission.budget,
            subject: "Confirmation: Enquiry Received for " + submission.project,
            body: "Hello " + submission.name + ",\n\n" +
                "Thank you for submitting the form regarding your enquiry" + submission.project + ".\n" +
                "we have entered your request regarding your enquiry" + submission.budget + ".\n\n" +
                "Best regards for your project,\n" +
                "Glitch & Grit Support Team",
            sentTimestamp: submission.submittedAt,
            expiresAt: submission.expiresAt
        };

        localEmails.push(newEmail);
        localStorage.setItem("gg_sent_emails", JSON.stringify(localEmails));
        console.log("Linked Automated Confirmation Dispatched:", newEmail);
    };

});
