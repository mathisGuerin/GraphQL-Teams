const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Link the database model with node application
// Define the different properties we expect from a player.
const PlayerSchema = new Schema({
    name: String,
    position: String,
    teamId: String
});

//Create a collection of Player inside the database with properties. 
module.exports = mongoose.model('Player', PlayerSchema);
