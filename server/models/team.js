const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: String,
    country: String,
    colors: Object
});

module.exports = mongoose.model('Team', teamSchema);
