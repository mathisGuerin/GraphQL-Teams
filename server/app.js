const express = require('express');
const graphqlHTTP = require('express-graphql'); // Help express to undestand graphql
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const mongoDbUrl = process.env.MONGO_DB_URL;

//Create the application with Express
const app = express();

// allow cross-origin requests
app.use(cors());

// mongoose allow us to connect our node server with the mongo database
// It provide some functions to do CRUD operations
// connect to mongo database
mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
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
