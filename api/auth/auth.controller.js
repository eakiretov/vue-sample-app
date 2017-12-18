'use strict';

var jwt = require('jsonwebtoken');
var crypto = require('crypto');

var config = require('../../config');
var response = require('../../libs/response');
var UserModel = require('./user.model');

function encryptPassword(password, salt) {
    if (!password) {
        return '';
    }

    return crypto.pbkdf2Sync(password, new Buffer(salt, 'base64'),
        10000, 64, 'sha1').toString('base64');
}

function signToken(user) {
    return jwt.sign({
        userId: user._id || user.userId,
        name: (user.firstName || '') + ' ' + (user.lastName || '')
    }, config.appSecret, {expiresIn: config.tokenLife});
}

module.exports.signin = function (req, res) {
    var authInfo = req.body;

    if (!authInfo.email || !authInfo.password) {
        return response.badRequest(res)('Required fields (email, password) are missing');
    }

    UserModel.findOne({email: authInfo.email.toLowerCase()}, function (err, user) {
        if (err) {
            return response.error(res)(err);
        }

        if (!user) {
            return response.authError(res)('Email does not exist or Password is invalid. Please try again.');
        }

        if (user.password !== encryptPassword(authInfo.password || '', user.salt || '')) {
            return response.authError(res)('Email does not exist or Password is invalid. Please try again.');
        }

        return response.item(res)({
            userId: user._id || user.userId,
            name: (user.firstName || '') + ' ' + (user.lastName || ''),
            authToken: signToken(user)
        });
    });
};

module.exports.signup = function (req, res) {
    var userInfo = req.body;

    if (!userInfo.email || !userInfo.password) {
        return response.badRequest(res)('Required fields (email, password) are missing');
    }

    if (userInfo.password.length < 6) {
        return response.badRequest(res)('Password should be at least 8 characters long.');
    }

    UserModel.findOne({email: userInfo.email.toLowerCase()}, function (err, existingUser) {
        if (err) {
            return response.error(res)(err);
        }

        if (existingUser) {
            return response.badRequest(res)('Your account already exists with this email. Do you want to sign in?');
        }

        var salt = crypto.randomBytes(16).toString('base64');

        UserModel.create({
            email: userInfo.email,
            password: encryptPassword(userInfo.password, salt),
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            salt: salt
        }, function (err, user) {
            if (err) {
                return response.error(res)(err);
            }

            return response.item(res)({
                userId: user._id || user.userId,
                name: (user.firstName || '') + ' ' + (user.lastName || ''),
                authToken: signToken(user)
            });
        });
    });
};

module.exports.verifyToken = function (req, res, next) {
    var token = '';
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {
            var scheme = parts[0];
            var credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            } else {
                return response.authError(res)('Format is Authorization: Bearer [token]');
            }
        } else {
            return response.authError(res)('Format is Authorization: Bearer [token]');
        }
    }

    if (!token) {
        return response.authError(res)('No authorization token was found');
    }

    jwt.verify(token, config.appSecret, {}, function (err, decoded) {
        if (err || !decoded || !decoded.userId) {
            return response.authError(res)('Invalid token');
        }
        req.user = decoded;
        next();
    });
};