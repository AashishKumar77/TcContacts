var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Course = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },

},
    {
        versionKey: false, // You should be aware of the outcome after set to false
        timestamps: true
    });
var Course = mongoose.model('Course', Course);
module.exports = Course;