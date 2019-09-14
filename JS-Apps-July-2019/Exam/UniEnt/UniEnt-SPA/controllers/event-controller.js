const eventController = (function () {

    const getCreateEvent = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();

        ctx.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function (res) {
            this.partial('./views/event/create-event.hbs');
        }).catch(function (err) {
            notifier.handleError(err);
        });
    };

    const postCreateEvent = function (ctx) {
        const { name, dateTime, description, imageURL } = ctx.params;

        if (name.length < 6) {
            notifier.showError('The event name should be at least 6 characters long.');
        } else if (!/^\d{1,2} [A-Z][a-z]+(?: - \d{1,2} (?:PM|AM))?$/.test(dateTime)) {
            notifier.showError('The date should be in string format (24 February; 24 March - 10 PM;).');
        } else if (description.length < 10) {
            notifier.showError('The description should be at least 10 characters long.');
        } else if (!imageURL.startsWith('http://') && !imageURL.startsWith('https://')) {
            notifier.showError('The image should start with "http://" or "https://".');
        } else {
            const organizer = userService.findUsername();
            const event = { name, dateTime, description, imageURL, organizer, peopleInterestedIn: 0 };

            eventService.createEvent(event)
                .then(function (res) {
                    notifier.showSuccess('Event created successfully.');
                    ctx.redirect('#/home');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const getEventDetails = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const eventId = ctx.params.eventId;

        eventService.getEvent(eventId)
            .then(function (event) {
                const userId = userService.findUserId();
                event.isCreator = event._acl.creator === userId;
                ctx.event = event;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/event/details-event.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const getEditEvent = function (ctx) {
        ctx.isAuthenticated = userService.checkSession();
        ctx.username = userService.findUsername();
        const eventId = ctx.params.eventId;

        eventService.getEvent(eventId)
            .then(function (event) {
                ctx.event = event;

                ctx.loadPartials({
                    header: './views/common/header.hbs',
                    footer: './views/common/footer.hbs'
                }).then(function (res) {
                    this.partial('./views/event/edit-event.hbs');
                });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const postEditEvent = function (ctx) {
        const { name, dateTime, description, imageURL, organizer, peopleInterestedIn } = ctx.params;

        if (name.length < 6) {
            notifier.showError('The event name should be at least 6 characters long.');
        } else if (typeof dateTime !== 'string') {
            notifier.showError('The date should be in string format (24 February; 24 March - 10 PM;).');
        } else if (description.length < 10) {
            notifier.showError('The description should be at least 10 characters long.');
        } else if (!imageURL.startsWith('http://') && !imageURL.startsWith('https://')) {
            notifier.showError('The image should start with "http://" or "https://".');
        } else {
            const eventId = ctx.params.eventId;
            const event = { name, dateTime, description, imageURL, organizer, peopleInterestedIn: Number(peopleInterestedIn) };

            eventService.editEvent(eventId, event)
                .then(function (res) {
                    notifier.showSuccess('Event edited successfully.');
                    ctx.redirect('#/home');
                })
                .catch(function (err) {
                    notifier.handleError(err);
                });
        }
    };

    const joinEvent = function (ctx) {
        const eventId = ctx.params.eventId;

        eventService.getEvent(eventId)
            .then(function (event) {
                event.peopleInterestedIn++;

                eventService.editEvent(eventId, event)
                    .then(function (res) {
                        notifier.showSuccess('You join the event successfully.');
                        ctx.redirect(`#/event/details/${eventId}`);
                    });
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    const deleteEvent = function (ctx) {
        const eventId = ctx.params.eventId;

        eventService.deleteEvent(eventId)
            .then(function (res) {
                notifier.showSuccess('Event closed successfully.');
                ctx.redirect('#/home');
            })
            .catch(function (err) {
                notifier.handleError(err);
            });
    };

    return {
        getCreateEvent,
        postCreateEvent,
        getEventDetails,
        getEditEvent,
        postEditEvent,
        joinEvent,
        deleteEvent
    };
})();
