const express = require("express");
const bcrypt = require("bcrypt");
const routes = express.Router();

const Tournament = require("../models/Tournament");
const Usuario = require("../models/Usuario");
const Notificacion = require("../models/Notificacion");
const UsuariosInternos = require("../models/UsuerInt");
const EquiposEx = require("../models/Equipos");
const Resultados = require("../models/Resultados");


routes.put("/modificar", async (req, res)=>{
  
  let cedula = req.body.cedula;
  let consultaMod = await Usuario.findOne({cedula: cedula});
  let datos ={
    cedula: cedula,
    nombre: req.body.nombre,
    correo: req.body.correo,
    acceso: req.body.acceso,
    contraseña: req.body.contraseña
  }
  if (!datos.cedula) {
    datos.cedula= consultaMod.cedula;
  } if(!datos.nombre) {
    datos.nombre= consultaMod.nombre;
  } if(!datos.correo){
    datos.correo= consultaMod.correo;
  } if (!datos.acceso){
    datos.acceso=consultaMod.acceso;
  } if (!datos.contraseña){
    datos.contraseña = consultaMod.contraseña;
  }

  await Usuario.findOneAndUpdate({cedula: cedula}, datos)
  
  console.log("prueba realizada")
})


routes.post("/login", async (req, res) => {
  let correo = req.body.correo;
  let acceso= req.body._id;
  let usuario = await Usuario.findOne({ correo: correo });
  // si el usuario no se encuentra en la primera coleccion

  if (!usuario) {
    let userInt = await UsuariosInternos.findOne({ correo: correo });


    if (!userInt) {
      return res.json({
        mensaje: "el usuario no existe",
      });
    } else {
      let password = req.body.contraseña;
      let validar = await bcrypt.compare(
        req.body.contraseña,
        userInt.contraseña
      );

      if (!validar) {
        return res.json({
          mensaje: "La contraseña no es correcta",
        });
      } else {
        if(acceso == '61c25eff8c657a1c17d0e1cd' ){
          return res.json({
            mensaje: "Bienvenido Administrador"
          })
        }else {
          return res.json({
            mensaje: "Bienvenido Usuario Interno"
          })
        }

      }
    }
  } else {
    let password = req.body.contraseña;
    let validar = await bcrypt.compare(req.body.contraseña, usuario.contraseña);
    if (!validar) {
      return res.json({
        mensaje: "La contraseña no es correcta",
      });
    } else {
      return res.json({
        mensaje: "Bienvenido",
      });
    }
  }
});

const userInt = async () => {
  const usersI = await UsuariosInternos.find();
  return usersI;
};
//Mostrar tabla de Usuarios Internos

routes.get("/usuariosInt", async (req, res) => {
  res.json(await userInt());
});

//Creacion de usuarios internos

routes.post("/crearUserInt", async (req, res) => {
  let body = req.body;

  //encriptar

  let salto = await bcrypt.genSalt(10);

  let password = await bcrypt.hash(body.contraseña, salto);

  let nuevo = {
    cedula: body.cedula,
    nombre: body.nombre,
    correo: body.correo,
    acceso: body.acceso,
    contraseña: password,
  };
  let userInt = new UsuariosInternos(nuevo);
  await userInt.save();

  res.json(userInt);
});

//eliminar usuario interno

routes.delete("/eliminar_userInt/:id", async (req, res) => {
  const id_user = req.params.id;

  const usuario = UsuariosInternos.findById(id_user);

  await usuario.deleteOne();
});

//Equipos
const Equipos = async () => {
  const equipos = await EquiposEx.find();
  return equipos;
};

//Mostrar tabla de los equipos

routes.get("/equiposUsers", async (req, res) => {
  res.json(await Equipos());
});

//Creacion de equipos

routes.post("/createEquipos", async (req, res) => {
  let body = req.body;
  let equipos = new EquiposEx(body);
  await equipos.save();
  res.json(equipos);
});

//Envio resultados a la base de datos

const Resultado = async () => {
  const resul = await Resultados.find();
  return resul;
};

//Mostrar Tabla de resultados

routes.get("/result", async (req, res) => {
  res.json(await Resultado());
});

//Creacion de resultados

routes.post("/crearResul", async (req, res) => {
  let body = req.body;
  let resultado = new Resultados(body);
  await resultado.save();
  res.json(resultado);
});

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
    state: body.state,
  };

  let tournament = new Tournament(new_tournamet);

  await tournament.save();

  res.json(tournament);
});

//Borrar torneos
routes.delete("/delete_tournament/:id_tournament", async (req, res) => {
  const id_fruta = req.params.id_tournament;

  const tournament = Tournaments.findById(id_tournament);
  await tournament.deleteOne();

  res.json({
    mensaje: "Tournamet deleted",
  });
});

//Actualizar torneos
routes.put("/update_tournament/:id_usuario", async (req, res) => {
  const id_tournament = req.params.id_tournament;

  const tournament = await Tournament.findById(id_tournament);
  tournament.name = req.body.name;
  tournament.place = req.body.place;
  tournament.date = req.body.date;
  tournament.numberofteams = req.body.numberofteams;
  tournament.prize = req.body.prize;
  tournament.state = req.body.state;

  await tournament.save();

  res.json({
    mensaje: "Tournament updated",
  });
});

routes.put("/actualizar_usuario/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario;

  const usuario = await Usuario.findById(id_usuario);
  usuario.nombre = req.body.nombre;
  usuario.correo = req.body.correo;
  usuario.celular = req.body.celular;
  usuario.rol = req.body.rol;

  await usuario.save();

  res.json({
    mensaje: "usuario actualizado correctamente",
  });
});

//Mostrar usuarios

routes.get("/get_usuarios", async (req, res) => {
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
    contraseña: password,
  };

  let usuario = new Usuario(nuevo_usuario);

  await usuario.save();

  res.json(usuario);
});

routes.delete("/eliminar_user/:id", async (req, res) => {
  const id_user = req.params.id;

  const usuario = Usuario.findById(id_user);

  await usuario.deleteOne();
});

routes.get("/get_notificacion/:id_usuario", async (req, res) => {
  const id_usuario = req.params.id_usuario;

  const notificaciones = await Notificacion.find({ id_usuario: id_usuario });

  res.json(notificaciones);
});

routes.post("/crear_notificacion", async (req, res) => {
  const notificacion = new Notificacion(req.body);

  await notificacion.save();

  res.json({
    mensaje: "notificacion creada correctamente",
  });
});

module.exports = routes;
