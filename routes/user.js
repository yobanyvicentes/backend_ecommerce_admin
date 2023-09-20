const { Router } = require('express');
const { body } = require('express-validator');
const {createUser, listAllUser, deleteUser, getOneUser, updateUser} = require('../controllers/user.js');

const router = Router();

router.get('/', listAllUser);
router.post('/', [body(['user_id', 'name', 'email', 'password', 'role', 'seller'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty(), body('email', 'debe ser un email con formato valido').isEmail()], createUser);
router.get('/:userId', getOneUser);
router.put('/:userId', [body(['user_id', 'name', 'email', 'password', 'role', 'seller'], 'el campo descrito en el path está vacio, debe asignarle un valor').notEmpty(), body('email', 'debe ser un email con formato valido').isEmail()], updateUser);
router.delete('/:userId', deleteUser);

module.exports = router
