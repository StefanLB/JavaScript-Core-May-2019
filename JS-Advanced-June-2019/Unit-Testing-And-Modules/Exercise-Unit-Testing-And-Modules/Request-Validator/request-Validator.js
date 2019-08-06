function requestValidator(request) {
    const validateMethod = function (method) {
        return ['GET', 'POST', 'DELETE', 'CONNECT'].indexOf(method);
    };

    const validateVersion = function (version) {
        return ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'].indexOf(version);
    };

    const [uriPattern, messagePattern] = [/^[A-Za-z0-9.]+$|\*/, /^[^<>\\&'"]+$|^$/];

    const errorFunc = function (type) {
        throw new Error(`Invalid request header: Invalid ${type}`);
    };

    if (validateMethod(request.method) === -1) {
        errorFunc('Method');
    }

    if (!uriPattern.test(request.uri) || !request.uri) {
        errorFunc('URI');
    }

    if (validateVersion(request.version) === -1) {
        errorFunc('Version');
    }

    if (request.message === '') {
        return request;
    }

    if (!messagePattern.test(request.message) || !request.message) {
        errorFunc('Message');
    }

    return request;
}
