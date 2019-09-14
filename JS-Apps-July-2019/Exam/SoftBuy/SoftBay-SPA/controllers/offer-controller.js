const offerController = (function () {

    const getCreateOffer = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.userId = userService.findUserId();

        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('./views/offer/create-offer.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postCreateOffer = function (ctx) {
        const { product, description, price, pictureUrl } = ctx.params;

        if (product.length === 0) {
            notifier.showError('The input field for product should be non-empty strings.');
        } else if (description.length === 0) {
            notifier.showError('The input field for description should be non-empty strings.');
        } else if (price.length === 0) {
            notifier.showError('The input field for price should be non-empty strings.');
        } else if (!pictureUrl.startsWith('http://') && !pictureUrl.startsWith('https://')) {
            notifier.showError('The picture should start with "http://" or "https://".');
        } else {
            const offer = { product, description, price, pictureUrl };

            offerService.createOffer(offer)
                .then(function (res) {
                    notifier.showSuccess('Offer created successfully.');
                    ctx.redirect('#/offer/dashboard');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getDashboard = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.userId = userService.findUserId();

        offerService.getAllOffers()
            .then(function (offers) {
                const userId = userService.findUserId();

                offers.forEach((offer) => {
                    offer.isCreator = offer._acl.creator === userId;
                });

                ctx.offers = offers.slice(0);

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/offer/dashboard.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getEditOffer = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.userId = userService.findUserId();
        const offerId = ctx.params.offerId;

        offerService.getOffer(offerId)
            .then(function (offer) {
                ctx.offer = offer;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/offer/edit-offer.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const postEditOffer = function (ctx) {
        const { product, description, price, pictureUrl } = ctx.params;

        if (product.length === 0) {
            notifier.showError('The input field for product should be non-empty strings.');
        } else if (description.length === 0) {
            notifier.showError('The input field for description should be non-empty strings.');
        } else if (price.length === 0) {
            notifier.showError('The input field for price should be non-empty strings.');
        } else if (!pictureUrl.startsWith('http://') && !pictureUrl.startsWith('https://')) {
            notifier.showError('The picture should start with "http://" or "https://".');
        } else {
            const offerId = ctx.params.offerId;
            const offer = { product, description, price, pictureUrl };

            offerService.editOffer(offerId, offer)
                .then(function (res) {
                    notifier.showSuccess('Offer edited successfully.');
                    ctx.redirect('#/offer/dashboard');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getDeleteOffer = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.userId = userService.findUserId();
        const offerId = ctx.params.offerId;

        offerService.getOffer(offerId)
            .then(function (offer) {
                ctx.offer = offer;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/offer/delete-offer.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const postDeleteOffer = function (ctx) {
        const offerId = ctx.params.offerId;

        offerService.deleteOffer(offerId)
            .then(function (res) {
                notifier.showSuccess('Offer deleted successfully.');
                ctx.redirect('#/offer/dashboard');
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const detailsOffer = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.userId = userService.findUserId();
        const offerId = ctx.params.offerId;

        offerService.getOffer(offerId)
            .then(function (offer) {
                ctx.offer = offer;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/offer/details-offer.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const buyOffer = function (ctx) {
        const userId = userService.findUserId();

        userService.getUser(userId)
            .then((user) => {                
                user.purchases++;

                userService.editUser(userId, user)
                    .then(function (res) {
                        notifier.showSuccess('Offer bought successfully.');
                        ctx.redirect('#/offer/dashboard');
                    });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    return {
        getCreateOffer,
        postCreateOffer,
        getDashboard,
        getEditOffer,
        postEditOffer,
        getDeleteOffer,
        postDeleteOffer,
        detailsOffer,
        buyOffer
    };
})();
