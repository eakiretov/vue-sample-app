'use strict';

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongo: {
        uri: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/vue-dev'
    },
    logs: {
        api: {
            path: './logs/api.log',
            suppress: false,
            includeLineAndFile: true,
            json: true,
            transports: {
                console: true,
                file: true
            }
        }
    },
    logLevel: 'debug',
    appSecret: 'secret',
    tokenLife: 7 * 24 * 60 * 60  //auth token life in minutes
};
