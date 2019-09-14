const eventService = (function () {

    const getMyEvents = function (userId) {
        return requester.get('appdata', `events?query={"_acl.creator":"${userId}"}`, 'Kinvey');
    };

    const createEvent = function (event) {
        return requester.post('appdata', 'events', 'Kinvey', event);
    };

    const getAllEvents = function () {
        return requester.get('appdata', `events?query={}&sort={"peopleInterestedIn": -1}`, 'Kinvey');
    };

    const getEvent = function (eventId) {
        return requester.get('appdata', `events/${eventId}`, 'Kinvey');
    };

    const editEvent = function (eventId, event) {
        return requester.put('appdata', `events/${eventId}`, 'Kinvey', event);
    };

    const deleteEvent = function (eventId) {
        return requester.del('appdata', `events/${eventId}`, 'Kinvey');
    };

    return {
        getMyEvents,
        createEvent,
        getAllEvents,
        getEvent,
        editEvent,
        deleteEvent
    };
})();
