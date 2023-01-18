const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');

//Crear el servidor express
const app = express();

//Configurar CORS
app.use(cors());


//Database
dbConnection();

//Rutas
app.get('/', (req,res) => {
    res.status(200).json({
        ok:true,
    });
})

app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
})