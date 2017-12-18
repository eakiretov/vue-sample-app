'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: String,
    lastName: String,
    phone: String,
    parents: {
        type: [Schema.Types.ObjectId],
        ref: 'Customer'
    }
});

CustomerSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.customerId = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);