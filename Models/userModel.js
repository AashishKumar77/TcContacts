var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user = new Schema({
    name: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    uniqueId: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,

    },
    deviceToken: {
        type: String,
        default: ""
    },
    deviceType: {
        type: String,
        default: ""
    },
    token: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
},
    {
        versionKey: false, // You should be aware of the outcome after set to false
        timestamps: true
    });
var user = mongoose.model('user', user);
module.exports = user;