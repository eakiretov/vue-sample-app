'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    salt: String,
    firstName: String,
    lastName: String
});

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.userId = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('User', UserSchema);