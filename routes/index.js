'use strict';

module.exports = function (app) {
    app.use('/api/v1/auth', require('../api/auth'));
    app.use('/api/v1/customer', require('../api/customer'));
};

