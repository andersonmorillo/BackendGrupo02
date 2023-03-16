const { response } = require("express");
const Hospital = require("../models/Hospital");
const Medico = require("../models/Medico");
const mongoose = require("mongoose")

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

const ActualizarMedico = async (req,res = response) => {
    const idHospital = req.body.hospital;
    const idMedico = req.params.id;
    const uid = req.uid;
    try {
        const medicoDb = await Medico.findById(idMedico);
        const hospitalDb = await Hospital.findById(idHospital);
        if(!medicoDb){
            return res.status(404).json({
                ok:false,
                msg:'No hay ningún medico con ese ID'
            });
        }
        if(!hospitalDb){
            return res.status(404).json({
                ok:false,
                msg:'No hay ningún Hospital con ese ID'
            });
        }
        const info = {
            ...req.body,
            user:uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(idMedico,info,{new:true});
        res.json({
            ok:true,
            medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ocurrió un error. Hable con el admin'
        });
    }
}

const BorrarMedico = async (req,res = response) => {
    const idMedico = req.params.id;
    try {
        const medicoDb = await Medico.findById(idMedico);
        if(!medicoDb){
            return res.status(404).json({
                ok:false,
                msg:'No hay ningún medico con ese ID'
            });
        }
        await Medico.findByIdAndDelete(idMedico);
        res.json({
            ok:true,
            msg:'Medico borrado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Ocurrió un error. Hable con el admin'
        });
    }
}

const medicoById = async (req,res = Response) => {
    const id = req.params.id;

    try {
        if( !mongoose.Types.ObjectId.isValid(id) ) return false;
        const medico = await Medico.findById(id).populate('user','nombre').populate('hospital','nombre');
        res.json({
            ok:true,
            medico
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }


}


module.exports = {getMedicos,crearMedico,ActualizarMedico,BorrarMedico,medicoById};