const express = require('express');
const graphqlHTTP = require('express-graphql'); // Help express to undestand graphql
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

//Create the application with Express
const app = express();

// allow cross-origin requests
app.use(cors());

// mongoose allow us to connect our node server with the mongo database
// It provide some functions to do CRUD operations
// connect to mongo database
mongoose.connect('mongodb://mathis:mathis-graphql@cluster0-shard-00-00-nbesj.mongodb.net:27017,cluster0-shard-00-01-nbesj.mongodb.net:27017,cluster0-shard-00-02-nbesj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql. 
// '/graphql' is the endpoint. 
app.use('/graphql', graphqlHTTP({
    schema, // how our data will look.
    graphiql: true
}));

// Listen the port 4000 and call a callback function.
// We can use nodemon package to restart automatically the server when some changes are detected.
app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
