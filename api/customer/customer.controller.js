'use strict';

var response = require('../../libs/response');
var CustomerModel = require('./customer.model');

module.exports.list = function (req, res) {
    var query = {};
    if (req.params.customerId) {
        query = {
            parents: {$in: [req.params.customerId]}
        }
    } else {
        query = {
            parents: {$size: 0}
        }
    }

    return CustomerModel.find(query)
        .then(response.list(res), response.error(res));
};

module.exports.get = function (req, res) {
    return CustomerModel.findOne({_id: req.params.customerId})
        .then(response.item(res), response.error(res));
};

module.exports.create = function (req, res) {
    return CustomerModel.findOne({_id: req.body.parent})
        .then(function (parent) {
            if (parent && parent.parents) {
                req.body.parents = parent.parents;
                req.body.parents.push(parent._id);
            }

            return CustomerModel.create(req.body)
        })
        .then(response.created(res), response.error(res));
};

module.exports.update = function (req, res) {
    return CustomerModel.findOneAndUpdate({_id: req.params.customerId}, req.body)
        .then(response.item(res), response.error(res));
};

module.exports.delete = function (req, res) {
    return CustomerModel
        .remove({
            $or: [
                {_id: req.params.customerId},
                {parents: {$in: [req.params.customerId]}}
            ]
        })
        .then(response.deleted(res), response.error(res));
};
