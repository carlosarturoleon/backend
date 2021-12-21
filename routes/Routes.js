const express = require("express");
const bcrypt = require("bcrypt");
const routes = express.Router();

const Tournament = require("../models/Tournament");
const Usuario = require("../models/Usuario");
const Notificacion = require('../models/Notificacion')
const UsuariosInternos =require ("../models/UsuerInt")


const userInt = async () => {
  const usersI =await UsuariosInternos.find()
  return usersI;
}
//Mostrar tabla de Usuarios Internos, falta poner el enlace en el front

routes.get("/usuariosInt", async (req, res) => {
  res.json(await userInt());
})

//Creacion de usuarios internos

routes.post("/crearUserInt", async (req,res)=>{
  let body= req.body
  let userInt= new UsuariosInternos(body)
  await userInt.save()

  res.json(userInt)
  
})

//Crear torneos
const get_tournament = async () => {
   const data = await Tournament.find();
   return data;
};


 routes.get("/get_tournaments", async (req, res) => {
   res.json(await get_tournament());
 });

routes.get("/get_tournaments/:id", async (req, res) => {
   let tournament_id = req.params.id;
   let tournament = await Tournament.findById(tournament_id);
    res.json(tournament);
});

routes.post("/create_tournamet", async (req, res) => {


  let body = req.body;

  let new_tournamet = {
    name: body.name,
    place: body.place,
    date: body.date,
    numberofteams: body.numberofteams,
    prize: body.prize,
    state: body.state
  };

  let tournament = new Tournament(new_tournamet);

  await tournament.save();

  res.json(tournament);
});

//Borrar torneos
routes.delete("/delete_tournament/:id_tournament", async (req, res) => {
  const id_tournament = req.params.id_tournament;

  const tournament = Tournament.findById(id_tournament);
  await tournament.deleteOne();

  res.json({
    mensaje: "Tournamet deleted",
  });
});


//Actualizar torneos
routes.put("/update_tournament/:id_usuario", async (req, res) => {
  const id_tournament = req.params.id_tournament;

  const tournament = await Tournament.findById(id_tournament);
  tournament.name = req.body.name
  tournament.place = req.body.place
  tournament.date = req.body.date
  tournament.numberofteams = req.body.numberofteams
  tournament.prize = req.body.prize
  tournament.state  = req.body.state

  await tournament.save()

  res.json({
    mensaje: "Tournament updated",
  });
});

routes.put("/actualizar_usuario/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario;

  const usuario = await Usuario.findById(id_usuario);
  usuario.nombre = req.body.nombre
  usuario.correo = req.body.correo
  usuario.celular = req.body.celular
  usuario.rol = req.body.rol

  await usuario.save()

  res.json({
    mensaje: "usuario actualizado correctamente",
  });
});

//Mostrar usuarios

routes.get('/get_usuarios', async (req, res) => {
  const usuarios = await Usuario.find();

  res.json(usuarios);
});


routes.get("/get_usuario/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario;

  const usuarios = await Usuario.findById(id_usuario);

  res.json(usuarios);
});

//Crear usuarios
routes.post("/crear_usuario", async (req, res) => {
  let body = req.body;

  let salto = await bcrypt.genSalt(10);

  let password = await bcrypt.hash(body.contraseña, salto);

  let nuevo_usuario = {
    cedula: body.cedula,
    nombre: body.nombre,
    correo: body.correo,
    acceso: body.acceso,
    contraseña: password
  };

  let usuario = new Usuario(nuevo_usuario);

  await usuario.save();

  res.json(usuario);
});

routes.get('/get_notificacion/:id_usuario', async (req, res) => {

  const id_usuario = req.params.id_usuario

  const notificaciones = await Notificacion.find({id_usuario: id_usuario})

  res.json(notificaciones)

})

routes.post('/crear_notificacion', async (req, res) => {

  const notificacion = new Notificacion(req.body)

  await notificacion.save()

  res.json({
    mensaje: 'notificacion creada correctamente'
  })

})


module.exports = routes;
