var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TcContacts');
var con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', function callback() {
    console.log("connected");
    con.collection('TcContacts', function (err, collection) {
        console.log(collection);
    });
});

module.exports = con;