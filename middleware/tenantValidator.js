const User = require("../models/User.js");

const tenantValidator = async (req, res, next) => {
    try {
        const tenant = req.params.tenant;
        if (!tenant) {
        return res.status(401).json({
            msg: "el tenant de la url no existe",
        });
        }

        const user = await User.findOne({ tenant: tenant, email: req.user.user });
        if (!user) {
        return res.status(401).json({
            msg: "acceso no permitido",
        });
        }

        next();
    }catch (error) {
        return res.status(401).json({
            msg: "error al validar ",
            error,
        });
    }
};

module.exports = { tenantValidator };
