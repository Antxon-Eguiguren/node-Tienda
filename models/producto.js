const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: String,
    departamento: String,
    precio: Number,
    activo: Boolean
});

productoSchema.statics.activos = function (callback) {
    this.model('producto').find({ activo: true }, callback);
}

module.exports = mongoose.model('producto', productoSchema);