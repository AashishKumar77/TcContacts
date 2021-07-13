var mongoose = require('mongoose');
const { uniq } = require('underscore');

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
    avatarType: {
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
    info: {
        type: String,

    },
    characterstics: {
        type: String,

    },
    knowfrom: {
        type: String,

    },
    image: {
        type: String,
        default: ""
    },
    notes: {
        type: String,

    },
    paymentStatus: {
        type: String,
        default: "0"

    },
},
    {
        versionKey: false, // You should be aware of the outcome after set to false
        timestamps: true
    });
var user = mongoose.model('user', user);
module.exports = user;