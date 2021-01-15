var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var catgory = new Schema({
    title: {
        type: String,
        trim: true,
        default: ''
    },
    people: [{
        type: Schema.Types.ObjectId,
        ref: 'Contact',
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    isDeleted: {
        type: Boolean,
        default: 0
    },
    bgcolor: {
        type: String,
    },
},
    {
        versionKey: false, // You should be aware of the outcome after set to false
        timestamps: true
    });
var catgory = mongoose.model('catgory', catgory);
module.exports = catgory;