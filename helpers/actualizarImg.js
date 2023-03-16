const fs = require('fs');
const Usuario = require('../models/Usuario');
const Medico = require('../models/Medico');
const Hospital = require('../models/Hospital');

const borrarImg = (currentPath) => {
    if (fs.existsSync(currentPath)) {
      //Borrar la imagen anterior
      fs.unlinkSync(currentPath);
    }
}

const actualizarImg = async (tipo,id,nombreArchivo) => {
    const model =
      tipo === "usuarios"
        ? Usuario
        : tipo === "medicos"
        ? Medico
        : tipo === "hospitales"
        ? Hospital
        : null;

    if (!model) {
      return false;
    }

    const currentCollection = await model.findById(id);

    if (!currentCollection) {
      return false;
    }

    const currentPath = `./uploads/${tipo}/${currentCollection.img}`;
    borrarImg(currentPath);

    currentCollection.img = nombreArchivo;
    await currentCollection.save();
    return true;
}

module.exports = actualizarImg;