const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Link the database model with node application
// Define the different properties we expect from a book.
const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

//Create a collection of Book inside the database with properties. 
module.exports = mongoose.model('Book', bookSchema);
