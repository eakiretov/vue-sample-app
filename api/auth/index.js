'use strict';

var express = require('express');
var router = express.Router();
var auth = require('./auth.controller');

router.post('/signin', auth.signin);
router.post('/signup', auth.signup);

module.exports = router;