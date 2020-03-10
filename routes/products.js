const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');

// GET http://localhost:3000/products
router.get('/', (req, res) => {
    Producto.find((err, rows) => {
        if (err) return res.json({ error: 'Error en la búsqueda de un item' });
        res.render('products/lista', { arrProductos: rows });
    });
});

// GET http://localhost:3000/products/new
router.get('/new', (req, res) => {
    res.render('products/formulario');
});

// POST http://localhost:3000/products/create
router.post('/create', (req, res) => {
    console.log(req.body);
    if (req.body.activo === 'on') req.body.activo = true
    else req.body.activo = false;
    Producto.create(req.body)
        .then(res.redirect('/products'))
        .catch(err => console.log(err));
});

module.exports = router;