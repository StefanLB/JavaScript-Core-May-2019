const userService = (function () {

    const checkSession = function () {
        return sessionStorage.getItem('authtoken') !== null;
    };

    const findUsername = function () {
        return sessionStorage.getItem('username') || '';
    };

    const findUserId = function () {
        return sessionStorage.getItem('userId');
    };

    const findFullName = function () {
        return sessionStorage.getItem('fullName') || '';
    };

    const saveSession = function (res) {
        sessionStorage.setItem('userId', res._id);
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('authtoken', res._kmd.authtoken);
        sessionStorage.setItem('fullName', `${res.firstName} ${res.lastName}`);
    };

    const registerUser = function (data) {
        return requester.post('user', '', 'Basic', data);
    };

    const loginUser = function (data) {
        return requester.post('user', 'login', 'Basic', data);
    };

    const logoutUser = function () {
        return requester.post('user', '_logout', 'Kinvey');
    };

    return {
        checkSession,
        findUsername,
        findUserId,
        findFullName,
        saveSession,
        registerUser,
        loginUser,
        logoutUser
    };
})();
