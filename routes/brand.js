const { Router } = require('express');
const { body } = require('express-validator');
const {createBrand, listAllBrand, deleteBrand, getOneBrand, updateBrand} = require('../controllers/brand.js');

const router = Router();

router.get('/', listAllBrand);
router.post('/', [body(['internal_id', 'name'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], createBrand);
router.get('/:brandId', getOneBrand);
router.put('/:brandId', [body(['internal_id', 'name'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], updateBrand);
router.delete('/:brandId', deleteBrand);

module.exports = router
