const jwt = require('jsonwebtoken');
require('dotenv').config();

const validarJWT = (req, res, next) => {
    const token = req.header('access-token');

    if (! token) {
        return res.status(401).json({
            msg: "inicie sesión primero"
        })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log("el payload de la verificación es:", payload);
        //preparar el request para el siguiente middleware
        req.user = payload;
        console.log("el req.user de la verificación es", req.user);
        //Dar paso al siguiente middleware
        next();
    } catch (error) {
        return res.status(401).json({
            msg: "token invalido validarJWT",
            error
        });
    }
}

module.exports = {validarJWT};
