var app = require('express')(),
    body = require('body-parser'),
    user = require('./Routes/userRoute')
db = require('./config/db');
var http = require('http');
var express = require('express');
var graphqlHTTP = require('express-graphql').graphqlHTTP
var { buildSchema } = require('graphql');
const cors = require('cors');
var CourseModel = require("./Models/course");
const events = [];
app.use(cors());
server = http.createServer();
server = app.listen(3000, function () {
    console.log(new Date().toISOString() + ": server started on port 3000 working");
    console.log('CORS-enabled web server listening on port 3000')
});

// GraphQL schema
var schema = buildSchema(`
type Event {
    _id:ID!
    name:String!
    email:String!
}

input EventInput{
     name:String!
    email:String!
}
type RootQuery{
events:[Event!]!
}
type RootMutation{
createEvent(eventInput:EventInput):Event
}

schema{
    query:RootQuery
    mutation:RootMutation
}
`);



var addcourse = () => {
    return CourseModel.find({}).then(result => {
        return result;
    }).catch(err => {
        throw err;
    })
}

var CreateCourse = (args) => {
    let event = new CourseModel({
        name: args.eventInput.name,
        email:args.eventInput.email
    })
    return event.save().then(rsult => {
       
        return {...rsult._doc};
    }).catch(err => {
        throw err;
    })
}


// Root resolver
var root = {
    events: addcourse,
    createEvent: CreateCourse
};

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/octet-stream');
    next();
});
app.use(body.json({ limit: '50mb' }));
app.use(body.urlencoded({ extended: true, limit: '50mb', parameterLimit: 500000000 }));
app.use(body.json());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.use('/v1', user);
console.log(__dirname, "__dirname ")
app.use(express.static(__dirname + '/upload/'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', ['GET,PUT,POST,DELETE', 'OPTIONS']);
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Origin', 'origin-list')
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true")
    next();
});
module.exports = app;
