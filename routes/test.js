const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');
const Empleado = require('../models/empleado');

// GET http://localhost:3000/test/insert
router.get('/insert', (req, res) => {
    let prod = new Producto();
    prod.nombre = 'Zapatos de salón';
    prod.departamento = 'Zapatos de mujer';
    prod.precio = 200;
    prod.activo = true;
    prod.save()
        .then(newProd => {
            res.json(newProd);
        })
        .catch(err => {
            res.json({ error: 'Error en la inserción en la BD' });
        });
});

// GET http://localhost:3000/test/insertv2
router.get('/insertv2', (req, res) => {
    Producto.create({
        nombre: 'Botines de piel',
        departamento: 'Zapatos de mujer',
        precio: 250,
        activo: true
    }).then(newProd => {
        res.json(newProd);
    }).catch(err => {
        res.json({ error: 'Error en la inserción en la BD' });
    })
});

// GET http://localhost:3000/test/insertv3
router.get('/insertv3', async (req, res) => {
    try {
        let newProd = await Producto.create({
            nombre: 'Bailarinas',
            departamento: 'Zapatos de mujer',
            precio: 180,
            activo: true
        });
        res.json(newProd);
    }
    catch (err) {
        res.json({ error: 'Error en la inserción en la BD' });
    }
});

// GET http://localhost:3000/test/find
router.get('/find', (req, res) => {
    Producto.find((err, rows) => {
        if (err) return res.json({ error: 'Error en la búsqueda de un item' });
        res.json(rows);
    });
});

// GET http://localhost:3000/test/findfiltrado
router.get('/findfiltrado', (req, res) => {
    Producto.find({
        precio: {
            $gt: 100,       // greater than
            $lt: 200        // less than
        },
        activo: true
    }, (err, rows) => {
        if (err) return res.json({ error: 'Error en la búsqueda de varios productos' });
        res.json(rows);
    });
});

// GET http://localhost:3000/test/relaciones
router.get('/relaciones', (req, res) => {
    Producto.findById('5e67ce27a47292a8defa07cf', (err, prod) => {
        let emp = new Empleado();
        emp.nombre_completo = 'Pedro Ruiz';
        emp.identificador = 'A123456';
        emp.departamento = 'Marketing';
        emp.edad = 30;
        emp.activo = true;
        emp.producto = prod;
        emp.save()
            .then(nuevoEmpleado => {
                res.json(nuevoEmpleado);
            })
            .catch(err => {
                res.json(err);
            })
    });
});

// GET http://localhost:3000/test/relacionesv2
router.get('/relacionesv2', (req, res) => {
    Producto.activos((err, prods) => {
        let emp = new Empleado();
        emp.nombre_completo = 'Marta Sánchez';
        emp.identificador = 'B65345';
        emp.departamento = 'Contabilidad';
        emp.edad = 41;
        emp.activo = true;
        emp.productos = prods;
        emp.save()
            .then(nuevoEmpleado => {
                res.json(nuevoEmpleado);
            })
            .catch(err => {
                res.json(err);
            })
    });
});

// GET http://localhost:3000/test/populate
router.get('/populate', (req, res) => {
    Empleado.findById('5e69fe691bd923e28826e64e')
        .populate('productos')
        .exec((err, empleado) => {
            if (err) res.json(err);
            res.json(empleado);
        });
});

module.exports = router;