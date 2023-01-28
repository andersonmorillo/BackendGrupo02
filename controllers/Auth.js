const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const generarJwt = require("../helpers/jwt");
const googleVerify = require("../helpers/google-verify");



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

const googleSignin = async (req,res = response) => {
    try {
        const {email,name,picture} = await googleVerify(req.body.token);
        const usuarioDb = await Usuario.findOne({email});
        let usuarioNew;
        if(!usuarioDb){
            usuarioNew = new Usuario({
                nombre:name,
                email,
                password: '@@',
                img: picture,
                google: true
            });
        }else{
            usuarioNew = usuarioDb;
            usuarioNew.google = true;
            if(!usuarioNew.img){
                usuarioNew.img = picture;
            }
        }
        //Guardar usuario
        await usuarioNew.save();

        //Generar token
        const token = await generarJwt(usuarioNew.id);
        res.json({
            ok:true,
            email,
            name,
            picture,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'Token de google no es correcto'
        });
    }
}

const renewToken = async (req,res = response) => {
    const uid = req.uid;
    const user = await Usuario.findById(uid);
    const token = await generarJwt(uid);
    res.json({
        ok:true,
        token,
        user
    });
}

module.exports = {
    login,
    googleSignin,
    renewToken
}