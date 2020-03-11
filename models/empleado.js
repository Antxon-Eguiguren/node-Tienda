const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empleadoSchema = new Schema({
    nombre: String,
    apellidos: String,
    identificador: String,
    departamento: String,
    edad: Number,
    activo: Boolean
});

empleadoSchema.virtual('nombre_completo').get(function () {
    return this.nombre + ' ' + this.apellidos;
});

empleadoSchema.virtual('nombre_completo').set(function (newValue) {
    let split = newValue.split(' ');
    this.nombre = split[0];
    this.apellidos = split[1];
});

empleadoSchema.methods.mismoDepartamento = function (callback) {
    this.model('empleado').find({ departamento: this.departamento }, callback);
}

module.exports = mongoose.model('empleado', empleadoSchema);