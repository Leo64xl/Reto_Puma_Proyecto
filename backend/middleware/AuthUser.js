import Users from "../models/UsersModel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Inicie sesión en su cuenta!" });
    }

    const user = await Users.findOne({
        where: { uuid: req.session.userId }
    });

    if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    req.userId = user.id;
    req.role = user.role;
    next();
};

export const adminOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: { uuid: req.session.userId }
    });

    if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (user.role !== "admin") {
        return res.status(403).json({ msg: "Acceso denegado" });
    }

    next();
};
// Compare this snippet from backend/routes/Auth.js: