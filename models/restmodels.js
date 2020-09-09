const mongoose = require('mongoose');

const mongorestSchema = new mongoose.Schema ({
    plato: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    
    tipo_de_plato: {
        type: String,
        required: true
    } 
})

module.exports = mongoose.model('MenuModel', mongorestSchema)