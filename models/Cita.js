const {Schema,model} = require('mongoose');

const CitaSchema = Schema({
    area: {
        type:String,
        required:true
    },
    fecha:{
        type: Date,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required:true
    },
    medico:{
        type: Schema.Types.ObjectId,
        ref: 'medico',
        required:true
    }
},{collection: 'citas'});

CitaSchema.method('toJSON',function(){
    const {__v,...object} = this.toObject();
    return object;
})


module.exports = model('Cita', CitaSchema);