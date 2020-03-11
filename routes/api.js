const express = require('express');
const router = express.Router();

const apiEmpleadosRouter = require('./api/empleados');
router.use('/empleados', apiEmpleadosRouter);

module.exports = router;