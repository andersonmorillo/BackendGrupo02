const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");

const validarJwt = (req, res = response,next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        });
    }

    try {
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token incorrecto'
        });
    }
}

const validarAdminRole = async (req,res,next) => {
    const uid = req.uid;
    try {
        const usuarioDb = await Usuario.findById(uid);
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }
        if(usuarioDb.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg:'No tiene permisos para realizar esto'
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const validarAdminRoleOMismoUser = async (req,res,next) => {
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuarioDb = await Usuario.findById(uid);
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }
        if(usuarioDb.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else {
            return res.status(403).json({
                ok:false,
                msg:'No tiene permisos para realizar esto'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {validarJwt,validarAdminRole,validarAdminRoleOMismoUser};