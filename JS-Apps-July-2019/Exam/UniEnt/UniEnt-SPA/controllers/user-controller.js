const userController = (function () {

    const getRegister = function (ctx) {
        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('./views/user/register.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postRegister = function (ctx) {
        const { username, password, rePassword } = ctx.params;

        if (username.length < 3) {
            notifier.showError('The username should be at least 3 characters long.');
        } else if (password.length < 6) {
            notifier.showError('The password should be at least 6 characters long.');
        } else if (password !== rePassword) {
            notifier.showError('The repeat password should be equal to the password.');
        } else {
            const data = { username, password };

            userService.registerUser(data)
                .then(function (res) {
                    userService.saveSession(res);
                    notifier.showSuccess('User registration successful.');
                    ctx.redirect('#/home');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getLogin = function (ctx) {
        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('./views/user/login.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postLogin = function (ctx) {
        const { username, password } = ctx.params;
        const data = { username, password };

        userService.loginUser(data)
            .then(function (res) {
                userService.saveSession(res);
                notifier.showSuccess('Login successful.');
                ctx.redirect('#/home');
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const logout = function (ctx) {
        userService.logoutUser()
            .then(function (res) {
                sessionStorage.clear();
                notifier.showSuccess('Logout successful.');
                ctx.redirect('#/home');
            }).catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getProfile = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const userId = userService.findUserId();

        eventService.getMyEvents(userId)
            .then(function (events) {

                ctx.count = events.length;
                ctx.events = events;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/user/profile.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        logout,
        getProfile
    };
})();
