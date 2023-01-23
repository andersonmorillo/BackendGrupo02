const { response } = require("express");
const Usuario = require("../models/Usuario");
const Medico = require("../models/Medico");
const Hospital = require("../models/Hospital");


const getTodo = async (req,res = response) => {
    const palabra = req.params.busqueda;
    const regex = new RegExp(palabra,'i');
     const [usuarios,medicos,hospitales] = await Promise.all([
         Usuario.find({nombre:regex}),
         Medico.find({nombre:regex}),
         Hospital.find({nombre:regex})
    ]);
    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    });
}

getDocumentosColeccion = async (req,res = response) => {
    const tabla = req.params.tabla;
    const palabra = req.params.busqueda;
    const regex = new RegExp(palabra,'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre:regex}).populate('user','nombre').populate('hospital','nombre');
            break;
        case 'hospitales':
            data = await Hospital.find({nombre:regex}).populate('user','nombre');
            break;
        case 'usuarios':
            data = await Usuario.find({nombre:regex});
            break;
        default:
            return res.status(400).json({
                ok:false,
                msg:'La tabla tiene que ser usuarios, medicos o hospitales'
            });
    }
    res.json({
        ok:true,
        data
    });
}

module.exports = {getTodo, getDocumentosColeccion};