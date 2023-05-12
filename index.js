// Importaciones
const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');

//Crear el servidor express
const app = express();

//Configurar CORS
app.use(cors());

//Carpeta pública
app.use(express.static('public'));

//Database
dbConnection();


app.set('port', process.env.PORT || 5000);

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/usuarios', require('./routes/usuarios'));
app.use('/login', require('./routes/auth'));
app.use('/hospitales', require('./routes/hospitales'));
app.use('/medicos', require('./routes/medicos'));
app.use('/todo', require('./routes/busquedas'));
app.use('/uploads', require('./routes/uploads'));
app.use('/citas', require('./routes/citas'));

//Rutas
app.get('/', (req,res) => {
    res.status(200).json({
        ok:true,
    });
})

app.listen(app.get('port'),()=>{
    console.log(`servidor corriendo en el puerto ${app.get('port')}`);
})