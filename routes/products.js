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

// GET http://localhost:3000/products/:id
router.get('/:id', (req, res) => {
    Producto.findById(req.params.id, (err, row) => {
        if (err) return res.json({ error: 'Error en la búsqueda de un item' });
        res.render('products/detalle', { producto: row });
    });
});

// GET http://localhost:3000/products/edit/:id
router.get('/edit/:id', (req, res) => {
    Producto.findById(req.params.id, (err, producto) => {
        if (err) return res.json({ err: 'Error al buscar el producto' });
        res.render('products/formularioEdit', { producto: producto });
    });
});

// GET http://localhost:3000/products/delete/:id
router.get('/delete/:productoId', (req, res) => {
    Producto.findByIdAndDelete(req.params.productoId, (err, producto) => {
        if (err) return res.json(err);
        res.redirect('/products');
    });
});

// POST http://localhost:3000/products/create
router.post('/create', (req, res) => {
    if (req.body.activo === 'true') req.body.activo = true
    else req.body.activo = false;
    Producto.create(req.body)
        .then(res.redirect('/products'))
        .catch(err => console.log(err));
});

// POST http://localhost:3000/products/update
router.post('/update', (req, res) => {
    Producto.findByIdAndUpdate(req.body.productoId, req.body, (err, producto) => {
        if (err) return res.json(err);
        res.redirect(`/products/${req.body.productoId}`);
    });
});

module.exports = router;