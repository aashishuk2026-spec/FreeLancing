$(document).ready(function () {

    var cookieModal = new bootstrap.Modal(document.getElementById('cookieModal'));

    // ALWAYS show modal on refresh or entering site
    cookieModal.show();

    // Accept button
    $("#acceptCookies").click(function () {
        cookieModal.hide();
    });

    // Reject button
    $("#rejectCookies").click(function () {
        cookieModal.hide();
    });

});
