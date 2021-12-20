const mongoose = require('../db/Database')

const Schema = mongoose.Schema

const tournamentSchema = new Schema({
    name: String,
    place: String,
    date: Date,
    numberofteams: Number,
    prize: String,
    state: String
})

const Tournament = mongoose.model('tournaments', tournamentSchema)

module.exports = Tournament