const { Router } = require('express');
const { body } = require('express-validator');
const {createCategory, listAllCategory, deleteCategory, getOneCategory, updateCategory} = require('../controllers/category.js');

const router = Router();

router.get('/', listAllCategory);
router.post('/', [body(['internal_id', 'name'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], createCategory);
router.get('/:categoryId', getOneCategory);
router.put('/:categoryId', [body(['internal_id', 'name'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], updateCategory);
router.delete('/:categoryId', deleteCategory);

module.exports = router
