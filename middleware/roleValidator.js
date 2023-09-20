const esAdmin = (req, res, next) =>{
    try {
        if (! req.user) {
            return res.status(500).json({
                message: "Debe validar el token",
                error
            });
        };
        const {role} = req.user;
        if (role.name !== "Administrador") {
            return res.status(403).json({
                message: "Usuario sin permisos necesarios",
                error
            });
        };
        next()
    } catch (error) {
        return res.status(401).json({
            msg: "token invalido esAdmin",
            error
        });
    }
}

module.exports = {esAdmin};
