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
        const { username, password, repeatPass, email, avatarUrl } = ctx.params;

        if (username.length < 3) {
            notifier.showError('The username should be at least 3 characters long.');
        } else if (!/[A-Za-z]+/.test(username)) {
            notifier.showError('The username should contain only english alphabet letters.');
        } else if (password.length < 6) {
            notifier.showError('The password should be at least 6 characters long.');
        } else if (!/[A-Za-z0-9]+/.test(password)) {
            notifier.showError('The password should contain only english alphabet letters and digits.');
        } else if (password !== repeatPass) {
            notifier.showError('Both passwords must match.');
        } else if (!email) {
            notifier.showError('The email is mandatory.');
        } else if (!avatarUrl) {
            notifier.showError('The avatarUrl is mandatory.');
        } else {
            const data = { username, password, email, avatarUrl };

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
                ctx.redirect('#/user/login');
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getProfile = async function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        ctx._id = userService.findUserId();
        const userId = ctx.params.userId;

        try {
            const [user, memes] = await Promise.all([
                userService.getUser(userId),
                memeService.getMyMemes(userId)
            ]);

            const currentUserId = userService.findUserId();
            user.isCreator = user._id === currentUserId;

            memes.forEach((meme) => {
                meme.isCreator = meme._acl.creator === currentUserId;
            });

            ctx.user = user;
            ctx.memes = memes;

            ctx.loadPartials({
                header: './views/common/header.hbs',
                footer: './views/common/footer.hbs'
            }).then(function (res) {
                this.partial('./views/user/profile.hbs');
            });
        } catch (err) {
            notifier.handleError(err);
        }
    };

    const deleteUser = function (ctx) {
        const userId = ctx.params.userId;

        userService.deleteUser(userId)
            .then(function (res) {
                notifier.showSuccess('User deleted.');
                ctx.redirect('#/user/register');
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
        getProfile,
        deleteUser
    };
})();
