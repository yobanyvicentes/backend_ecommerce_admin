//importar el modelo User
require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//metodo login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //validar existencia user
        const user = await User.findOne({ email }).populate([
            {path: 'role' , select: 'name'}
        ]);
        if (!user) {
            return res.status(404).json({
                msg: "el usuario ingresado no existe"
            })
        };
        //validar que la contraseña sea correcta
        const esPassword = bcrypt.compareSync(password, user.password);
        console.log(esPassword);
        if (!esPassword) {
            return res.status(404).json({
                msg: "contraseña incorrecta"
            })
        };
        //generar token
        const TIEMPO_EXPIRATION_HORAS = 1 * 60 * 60 * 1000;
        const payload = {
            user: user.email,
            name: user.nombre,
            role: user.role,
            exp: Date.now() + TIEMPO_EXPIRATION_HORAS
        };
        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: TIEMPO_EXPIRATION_HORAS }
        );
        res.json({ user, token });
        next();
    } catch (error) {
        res.status(500).send('hay un error');
    }
}

module.exports = { login };
