'use strict';

var winston = require('winston');
var path = require('path');
var config = require('../config');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

var Logger = function (options) {
    this.options = options;
    var transports = [];

    if (!this.options.transports) {
        this.options.transports = {
            console: true,
            file: config.env !== 'development'
        };
    }

    if (this.options.transports.console) {
        transports.push(new (winston.transports.Console)({
            colorize: true,
            json: this.options.json,
            level: config.logLevel
        }));
    }

    if (this.options.transports.file) {
        transports.push(new (winston.transports.File)({
            name: 'full',
            filename: this.options.path,
            json: this.options.json,
            level: config.logLevel
        }));

        transports.push(new winston.transports.DailyRotateFile({
            name: 'daily',
            datePattern: '.yyyy-MM-dd',
            filename: this.options.path,
            json: this.options.json,
            level: config.logLevel
        }));
    }

    this.logger = new (winston.Logger)({
        transports: transports
    });
};

Logger.prototype.setLineAndFile = function (message) {
    delete  message.file;
    delete message.line;

    if (!this.options.includeLineAndFile) {
        return;
    }

    var stacklist = (new Error()).stack.split('\n').slice(3);
    var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;
    var data = {};
    var s = stacklist[0];
    var sp = stackReg.exec(s) || stackReg2.exec(s);
    if (sp && sp.length === 5) {
        message.method = sp[1];
        message.file = path.basename(sp[2]);
        message.line = sp[3];
    }
};

Logger.prototype.error = function (message) {
    this.setLineAndFile(message);
    if (!this.options.suppress) {
        this.logger.error(message);
    }
};

Logger.prototype.info = function (message) {
    //this.setLineAndFile(message);
    if (!this.options.suppress) {
        this.logger.info(message);
    }
};

Logger.prototype.warn = function (message) {
    //this.setLineAndFile(message);
    if (!this.options.suppress) {
        this.logger.warn(message);
    }
};

module.exports = Logger;
