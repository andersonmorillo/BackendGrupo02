const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const generarJwt = require("../helpers/jwt");



const login = async (req,res = response) => {
    try {
        const {email, password} = req.body;
        const usuarioDb = await Usuario.findOne({email});
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msg:'Email o contraseñas no son correctas'
            });
        }

        //Verificar contraseña
        const claveValida = bcrypt.compareSync(password,usuarioDb.password);
        if(!claveValida){
            return res.status(404).json({
                ok:false,
                msg:'Email o contraseñas no son correctas'
            }); 
        }
        //Generar JWT
        const token = await generarJwt(usuarioDb.id);
        res.json({
            ok:true,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Error'
        })
    }
}

module.exports = {
    login
}