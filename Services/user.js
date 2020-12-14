'use strict';

var responses = require('../response'); //UniversalFunctions.responses;
var Models = require('../Models/userModel');
var table_name = Models;


var update = function (criteria, objToSave, options, callback) {
    table_name.findOneAndUpdate(criteria, objToSave, options, function (err, result) {
        if (err) {
            if (err.name == "CastError") return callback(responses.INVALID_POST_ID);
            return callback(err);
        }
        // //console.log(result);
        // //console.log("+++++++++++++++++++++++++++++++++++++++++")
        return callback(null, result);
    });
};

var findOneValue = function (criteria, options, projection, callback) {
    //console.log('criteria', criteria)
    // //console.log('callback',callback)
    table_name.findOne(criteria, (err, data) => {
        if (err) {
            if (err.name == "CastError") return callback(responses.Invalid_Authentication);
            return callback(err);
        }
        console.log('data', data);
        return callback(null, data);
    });
};

var add = function (objToSave, callback) {
    //console.log('In Faq ADDDDD');
    new table_name(objToSave).save(function (err, result) {
        if (err) {
            //console.log(err);
            return callback(err);
        }
        return callback(null, result);
    });
};

var deleteInfo = function (dataToRemove, options, callback) {
    //console.log("dataToRemove", dataToRemove);
    table_name.remove(dataToRemove, function (err) {
        if (err) return callback(err);
        return callback();
    });
}

module.exports = {
    update: update,
    findOneValue: findOneValue,
    add: add,
    deleteInfo: deleteInfo
};