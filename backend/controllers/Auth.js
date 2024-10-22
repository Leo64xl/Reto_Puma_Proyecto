import Users from "../models/UsersModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await Users.findOne({        
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "Las credenciales no son validas"});    
    const match = await argon2.verify(user.password, req.body.password);    
    if(!match) return res.status(400).json({msg: "Ups algo salio mal"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

export const Me = async (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "Inicie sesión en su cuenta!"});
    }
    const user = await Users.findOne({        
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});  
    res.status(200).json(user);
}

export const logOut = async (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "No se puede cerrar sesión"});
        res.status(200).json({msg:"Logout exitoso"});
    });   
}