const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: String,
    departamento: String,
    precio: Number,
    activo: Boolean
});

module.exports = mongoose.model('producto', productoSchema);