const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');

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

module.exports = router;