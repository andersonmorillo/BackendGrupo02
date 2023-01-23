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

const ActualizarHospital = (req,res = response) => {
    res.json({
        ok:true,
        msg:'Actualizado'
    });
}

const BorrarHospital = (req,res = response) => {
    res.json({
        ok:true,
        msg:'Borrado'
    });
}




module.exports = {getHospitales,crearHospital,ActualizarHospital,BorrarHospital};