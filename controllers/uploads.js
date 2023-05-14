const { response } = require("express");
const { uploadBlob } = require("../database/blobStorage");
const Usuario = require("../models/Usuario");
const Medico = require("../models/Medico");
const Hospital = require("../models/Hospital");


const fileUpload = async (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo no es válido'
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se envió ningún archivo'
        });
    }

    const extension = req.files.imagen.mimetype;
    const [, type] = extension.split("/");
    if (!extension.startsWith('image')) {
        return res.status(400).json({
            ok: false,
            msg: 'El formato no corresponde a una imagen'
        });
    }
    const model =
      tipo === "usuarios"
        ? Usuario
        : tipo === "medicos"
        ? Medico
        : tipo === "hospitales"
        ? Hospital
        : null;
    url = await uploadBlob(req.files.imagen,tipo,req.files.imagen.name);
    const currentCollection = await model.findById(id);
    
    if (!currentCollection) {
      return false;
    }
    
    if (currentCollection.img !== url) {
        currentCollection.img = url;
        await currentCollection.save();
        return res.json({
            ok: true,
            msg: 'Archivo subido',
        });
    }
}



module.exports = { fileUpload };
