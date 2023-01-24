const { response } = require("express");
const Hospital = require("../models/Hospital");




const getHospitales = async (req,res = response) => {
    const hospitales = await Hospital.find().populate('user','nombre');
    res.json({
        ok:true,
        hospitales
    });
}

const crearHospital = async (req,res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({user:uid,...req.body});
    try {
        const hospitalDb = await hospital.save();
        res.json({
            ok:true,
            hospitalDb
        });
        
    } catch (error) {
         console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        });    
    }
}

const ActualizarHospital = async (req,res = response) => {
    const idHospital = req.params.id;
    const nombre = req.body.nombre;
    const uid = req.uid;
    try {
        const hospitalDb = await Hospital.findById(idHospital);
        if(!hospitalDb){
            return res.status(404).json({
                ok:false,
                msg:'No hay ningún hospital con ese ID'
            });
        }
        const cambiosHospital = {
            ...req.body,
            user:uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(idHospital,cambiosHospital,{new:true});
        res.json({
            ok:true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res(500).json({
            ok:false,
            msg:'Ha ocurrido un error, hable con el ADMIN'
        })
    }
}

const BorrarHospital = async (req,res = response) => {
    const id = req.params.id;
    try {
        const hospitalDb = await Hospital.findById(id);
        if(!hospitalDb){
            return res.status(404).json({
                ok:false,
                msg:'No hay ningún hospital con ese ID'
            });
        }
        await Hospital.findByIdAndDelete(id); 
        res.json({
            ok:true,
            msg:'Borrado'
        });
    } catch (error) {
        console.log(error);
        res(500).json({
            ok:false,
            msg:'Ha ocurrido un error, hable con el ADMIN'
        });
    }
}




module.exports = {getHospitales,crearHospital,ActualizarHospital,BorrarHospital};