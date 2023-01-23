const { response } = require("express");
const Medico = require("../models/Medico");

const getMedicos = async (req,res = response) => {
    const medicos = await Medico.find().populate('user','nombre').populate('hospital','nombre');
    res.json({
        ok:true,
        medicos
    });
}

const crearMedico = async (req,res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        user:uid,
        ...req.body
    });
    try {
        const medicoDb = await medico.save();
        res.json({
            ok:true,
            medicoDb
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ocurrió un error. Hable con el admin'
        })
    }
}

const ActualizarMedico = (req,res = response) => {
    res.json({
        ok:true,
        msg:'Actualizado'
    });
}

const BorrarMedico = (req,res = response) => {
    res.json({
        ok:true,
        msg:'Borrado'
    });
}




module.exports = {getMedicos,crearMedico,ActualizarMedico,BorrarMedico};