const { Router } = require('express');
const { body } = require('express-validator');
const {createSeller, listAllSeller, deleteSeller, getOneSeller, updateSeller} = require('../controllers/seller.js');

const router = Router();

router.get('/', listAllSeller);
router.post('/', [body(['internal_id', 'name', 'description'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], createSeller);
router.get('/:sellerId', getOneSeller);
router.put('/:sellerId', [body(['internal_id', 'name', 'description'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], updateSeller);
router.delete('/:sellerId', deleteSeller);

module.exports = router
