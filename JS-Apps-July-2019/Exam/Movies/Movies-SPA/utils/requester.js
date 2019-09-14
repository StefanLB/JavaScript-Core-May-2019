const requester = (function () {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_rkKaxTMMS';
    const appSecret = '074cb48c56ac49308fbc5d4ac5d54474';

    const makeHeaders = function (authorization) {
        if (authorization === 'Basic') {
            return {
                Authorization: `${authorization} ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            };
        } else if (authorization === 'Kinvey') {
            return {
                Authorization: `${authorization} ${sessionStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            };
        }
    };

    const makeRequest = function (method, collection, endpoint, authorization) {
        return {
            method,
            url: `${baseUrl}/${collection}/${appKey}/${endpoint}`,
            headers: makeHeaders(authorization)
        };
    };

    const post = function (collection, endpoint, authorization, data) {
        const req = makeRequest('POST', collection, endpoint, authorization);
        req.data = JSON.stringify(data);
        return $.ajax(req);
    };

    const get = function (collection, endpoint, authorization) {
        const req = makeRequest('GET', collection, endpoint, authorization);
        return $.ajax(req);
    };

    const put = function (collection, endpoint, authorization, data) {
        const req = makeRequest('PUT', collection, endpoint, authorization);
        req.data = JSON.stringify(data);
        return $.ajax(req);
    };

    const del = function (collection, endpoint, authorization) {
        const req = makeRequest('DELETE', collection, endpoint, authorization);
        return $.ajax(req);
    };

    return {
        post,
        get,
        put,
        del
    };
})();
