const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const validar_token = require('./validar_token/validar_token')
require('dotenv').config()

const routes = require('./routes/Routes')
// const rutas = require('./routes/Rutas')

const app = express()
const puerto = process.env.PORT || 8000
const cors_config = {
    origin: '*'
}


var jsonParser = bodyParser.json()
 
app.use('/api', jsonParser, cors(cors_config), routes)
// app.use('/api', jsonParser, cors(cors_config), validar_token, rutas)


app.listen(puerto, () => {
    console.log("Server ready");
})