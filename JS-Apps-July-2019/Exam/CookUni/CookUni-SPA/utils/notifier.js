const notifier = (function () {
    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').fadeIn();
        },
        ajaxStop: function () {
            $('#loadingBox').fadeOut();
        }
    });

    const showSuccess = function (message) {
        const successBox = $('#successBox');
        successBox.text(message);
        successBox.fadeIn();
        successBox.fadeOut(3000);
    };

    const showError = function (message) {
        const errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.fadeIn();
        errorBox.fadeOut(3000);
    };

    const handleError = function (err) {
        showError(err.responseJSON.description);
    };

    return {
        showSuccess,
        showError,
        handleError
    };
})();
