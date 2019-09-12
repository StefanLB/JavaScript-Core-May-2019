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
        const infoBox = $('#infoBox');
        infoBox.find('span').text(message);
        infoBox.fadeIn();
        infoBox.fadeOut(3000);
    };

    const showError = function (message) {
        const errorBox = $('#errorBox');
        errorBox.find('span').text(message);
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
