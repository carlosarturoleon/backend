const mongoose = require('../db/Database')

const Schema = mongoose.Schema

const ResultadosSchema = new Schema({
    nombre_equipo: String,
    puntos: String
})

const Resultados = mongoose.model('Resultados_Equipos', ResultadosSchema)

module.exports = Resultados