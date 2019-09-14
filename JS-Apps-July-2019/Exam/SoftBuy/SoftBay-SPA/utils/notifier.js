const notifier = (function () {
    $(document).on({
        ajaxStart: function () {
            $('#loadingNotification').fadeIn();
        },
        ajaxStop: function () {
            $('#loadingNotification').fadeOut();
        }
    });

    const showSuccess = function (message) {
        const successNotification = $('#successNotification');
        successNotification.text(message);
        successNotification.fadeIn();
        successNotification.fadeOut(3000);
    };

    const showError = function (message) {
        const errorNotification = $('#errorNotification');
        errorNotification.text(message);
        errorNotification.fadeIn();
        errorNotification.fadeOut(3000);
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
