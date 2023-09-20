const { Router } = require('express');
const { body } = require('express-validator');
const {createRole, listAllRole, deleteRole, getOneRole, updateRole} = require('../controllers/role.js');

const router = Router();

router.get('/', listAllRole);
router.post('/', [body(['internal_id', 'name'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], createRole);
router.get('/:roleId', getOneRole);
router.put('/:roleId', [body(['internal_id', 'name'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty()], updateRole);
router.delete('/:roleId', deleteRole);

module.exports = router
