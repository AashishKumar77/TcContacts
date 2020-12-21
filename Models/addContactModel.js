var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Contact = new Schema({
    name: {
        type: String,
        trim: true,
        default: ''
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    email: {
        type: String,
        default: ''
    },
    catgory: {
        type: String,
        default: ''
    },
    fav: {
        type: Boolean,
        default: 0
    },
    phoneNumber: {
        type: String,

    },
    gender: {
        type: String,

    },
    characterstics: {
        type: String,

    },
    knowfrom: {
        type: String,

    },
    isDeleted: {
        type: Boolean,
        default: false

    },
    info: {
        type: String,

    },
    bgcolor: {
        type: String,
    },
    notes: {
        type: String,

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
var Contact = mongoose.model('Contact', Contact);
module.exports = Contact;