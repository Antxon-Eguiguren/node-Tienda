const express = require('express');
const router = express.Router();

const Empleado = require('../../models/empleado');

// GET http://localhost:3000/api/empleados
router.get('/', (req, res) => {
    Empleado.find((err, rows) => {
        if (err) return res.json({ err: 'Error al leer los empleados de la BD' });
        res.json(rows);
    })
});

// GET http://localhost:3000/api/empleados/nombres
router.get('/nombres', (req, res) => {
    Empleado.find((err, empleados) => {
        let arrNombres = empleados.map(empleado => empleado.nombre_completo);
        res.json(arrNombres);
    });
});

// GET http://localhost:3000/api/empleados/mismodepartamento
router.get('/mismodepartamento', (req, res) => {
    let emp = new Empleado();
    emp.departamento = 'Marketing';
    emp.mismoDepartamento((err, empleados) => {
        if (err) return res.json(err);
        res.json(empleados)
    });
});

// POST http://localhost:3000/api/empleados
router.post('/', (req, res) => {
    Empleado.create(req.body)
        .then(response => {
            res.json(response)
        })
        .catch(err => res.json({ error: 'Error en la inserción de Empleado en la BD' }));
});

module.exports = router;