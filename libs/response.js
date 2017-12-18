'use strict';

module.exports.created = function (res) {
    return function (data) {
        res.status(201).json(data);
    };
};

module.exports.deleted = function (res) {
    return function (data) {
        res.status(200).json({
            statusText: 'Deleted',
            statusCode: 200
        });
    };
};

module.exports.item = function (res) {
    return function (data) {
        res.status(200).json(data);
    };
};

module.exports.list = function (res) {
    return function (data) {
        res.status(200).json(data);
    };
};

module.exports.error = function (res) {
    return function (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            description: err.message || err,
            code: 500
        });
    };
};

module.exports.badRequest = function (res) {
    return function (message) {
        res.status(400).json({
            message: message,
            code: 400
        });
    };
};

module.exports.authError = function (res) {
    return function (message) {
        res.status(401).json({
            message: message,
            code: 401
        });
    };
};