const { Router } = require('express');
const { body } = require('express-validator');
const {createProduct, listAllProduct, deleteProduct, getOneProduct, updateProduct} = require('../controllers/product.js');

const router = Router();

router.get('/', listAllProduct);
router.post('/', [body(['internal_id', 'name', 'description', 'image', 'price', 'inventory', 'seller', 'brand', 'category'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], createProduct);
router.get('/:productId', getOneProduct);
router.put('/:productId', [body(['internal_id', 'name', 'description', 'image', 'price', 'inventory', 'seller', 'brand', 'category'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router
