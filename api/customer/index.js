'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.controller');
var customer = require('./customer.controller');

router.post('/', auth.verifyToken, customer.create);
router.get('/list', auth.verifyToken, customer.list);
router.get('/list/:customerId', auth.verifyToken, customer.list);
router.get('/:customerId', auth.verifyToken, customer.get);
router.put('/:customerId', auth.verifyToken, customer.update);
router.delete('/:customerId', auth.verifyToken, customer.delete);

module.exports = router;