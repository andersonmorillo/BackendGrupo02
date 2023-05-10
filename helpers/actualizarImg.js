const { uploadBlob, deleteBlob } = require('../database/blobstorage');

const Usuario = require('../models/Usuario');
const Medico = require('../models/Medico');
const Hospital = require('../models/Hospital');


const actualizarImg = async (tipo,id,nombreArchivo,url) => {
    const currentCollection = await tipo.findById(id);

    if (!currentCollection) {
      return false;
    }
    // Borrar imagen anterior
    if (currentCollection.img) {
      await deleteBlob(tipo,nombreArchivo);
    }

    currentCollection.img = blobFile.image;
    await currentCollection.save();
    return true;
}

module.exports = actualizarImg;