const { response } = require("express");
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const actualizarImg = require("../helpers/actualizarImg");


const fileUpload = (req,res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['medicos','hospitales','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'El tipo no es válido'
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No se envió ningún archivo'
        });
    }

    const extension = req.files.imagen.mimetype;
    const [,type] = extension.split("/");
    if(!extension.startsWith('image')){
        return res.status(400).json({
            ok:false,
            msg:'El formato no corresponde a una imagen'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${type}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen
    const file = req.files.imagen;
    file.mv(path,(error)=>{
        if(error){
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            })
        }

        //Actualizar base de datos
        if(!actualizarImg(tipo,id,nombreArchivo)){
            return res.status(500).json({
                ok:false,
                msg:'No se encontró ID'
            });
        }else{
            return res.json({
                ok:true,
                msg:'Archivo subido',
                nombreArchivo
            });
        }
    });
}

const getImg = (req,res = response) => {
    const tipo = req.params.tipo;
    const img = req.params.img;
    //Imagen por defecto
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${img}`);
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const newImg = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(newImg);
    }


}

module.exports = {fileUpload,getImg};