const { response } = require('express');
const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');

const getCitas = async (req,res = response) => {
    const uid = req.params.id;
    const citas = await Usuario.findById(uid).populate('citas');
    res.json({
        ok:true,
        citas
    });
}

const crearCita = async (req,res = response) => {
    const uid = req.uid;
    const cita = new Cita({
        user:uid,
        ...req.body
    });
    await cita.save();
    await Usuario.findByIdAndUpdate(uid, { $push: { citas: cita._id } });
    try {
        const citaDb = await cita.save();
        res.json({
            ok:true,
            citaDb
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ocurrió un error. Hable con el admin'
        })
    }
}

const cancelarCita = async (req,res = response) => {
    const id = req.params.id;
    try {
        const citaDb = await Cita.findById(id);
        if(!citaDb){
            return res.status(404).json({
                ok:false,
                msg:'No existe ninguna cita con ese ID'
            });
        };
        await Cita.findByIdAndDelete(id);
        res.status(200).json({
            ok:true,
            msg:'Cita eliminado correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        }); 
    }
}

module.exports = {getCitas, crearCita,cancelarCita};
