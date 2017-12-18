'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');
var cors = require('cors');
var Logger = require('./libs/logger');
var logger = new Logger(config.logs.api);

mongoose.connect(config.mongo.uri, {
    useMongoClient: true
});
mongoose.Promise = require('bluebird');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set('etag', false);
app.use(express.static(path.join(__dirname, 'public/dist')));

app.use(function (req, res, next) {
    logger.info({
        method: req.method,
        path: req.originalUrl,
        authHeader: req.headers.authorization || '',
        request: req.body
    });
    next();
});

require('./routes')(app);

app.use(function (err, req, res, next) {
    logger.error({
        method: req.method,
        path: req.originalUrl,
        authHeader: req.headers.authorization || '',
        request: req.body,
        responseCode: 500,
        error: err.message || err
    });
    res.status(500).send({code: 500, message: 'Internal Server Error', error: err.message});
});

module.exports = app;
