const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const generarJwt = require('../helpers/jwt');


const getUsuarios = async (req,res) => {
    const usuarios = await Usuario.find({},'nombre email role google');
    res.json({
        ok:true,
        usuarios
    });
}

const crearUsuarios = async(req,res = response) => {
    const {email,password,nombre} = req.body;

    
    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok:true,
                msg: 'El correo ya está registrado'
            });
        }
        const usuario = new Usuario(req.body);

        //Encriptar resultado
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        //Guardar en la base de datos
        await usuario.save();

        const token = await generarJwt(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}

const actualizarUsuario = async (req,res = response) => {
    const uid = req.params.id
    try {
        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese ID'
            });
        };
        //Actualizaciones
        //Desestructurar para sacar password, email y google que no se necesitan
        const {password,google,email,...campos} = req.body;
        if(usuarioDb.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:true,
                    msg:'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});
        res.json({
            ok:true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}


const borrarUsuario = async (req,res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese ID'
            });
        };
        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok:true,
            msg:'Usuario eliminado correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        }); 
    }
}


module.exports = {getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario};