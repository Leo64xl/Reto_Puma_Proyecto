import Forms from "../models/FormModel.js";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize";

export const getForms = async(req, res) => {
    try {
        let response;
        if(req.role === "admin") {
            response = await Forms.findAll({
                attributes: ['uuid', 'nameForm', 'nameUser', 'nameUser2', 'lastnameone', 'lastnametwo', 'birthday', 'category1', 'typekit', 'talla', 'team', 'phone', 'email', 'origin'],
                include: [{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }else{
            response = await Forms.findAll({
                attributes: ['uuid', 'nameForm', 'nameUser', 'nameUser2', 'lastnameone', 'lastnametwo', 'birthday', 'category1', 'typekit', 'talla', 'team', 'phone', 'email', 'origin'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getFormById = async(req, res) => {
    try {
        const form = await Forms.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!form) return res.status(404).json({msg: "Datos no encontrados"});
        let response;
        if(req.role === "admin" || req.role === "user") {
            response = await Forms.findOne({
                attributes: ['uuid', 'nameForm', 'nameUser', 'nameUser2', 'lastnameone', 'lastnametwo', 'birthday', 'category1', 'typekit', 'talla', 'team', 'phone', 'email', 'origin'],
                where: {
                id: form.id
            },
                include: [{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }else{
            response = await Forms.findOne({
                attributes: ['uuid', 'nameForm', 'nameUser', 'nameUser2', 'lastnameone', 'lastnametwo', 'birthday', 'category1', 'typekit', 'talla', 'team', 'phone', 'email', 'origin'],
                where: {
                    [Op.and] : [{id: form.id}, {userId: req.userId}]                    
                },
                include: [{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createForm = async (req, res) => {
    const { nameForm, nameUser, nameUser2, lastnameone, lastnametwo, birthday, category1, typekit, talla, team, phone, email, origin } = req.body;
    try {
        await Forms.create({
            nameForm: nameForm,
            nameUser: nameUser,
            nameUser2: nameUser2,
            lastnameone: lastnameone,
            lastnametwo: lastnametwo,
            birthday: birthday,
            category1: category1,
            typekit: typekit,
            talla: talla,
            team: team,
            phone: phone,
            email: email,
            origin: origin,
            userId: req.userId
        });
        res.status(201).json({msg: "Formulario creado correctamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateForm = async (req, res) => {
    try {
        const form = await Forms.findOne({
        where: {
            uuid: req.params.id
        }
        });
        if(!form) return res.status(404).json({msg: "Datos no encontrados"});
        const { nameForm, nameUser, nameUser2, lastnameone, lastnametwo, birthday, category1, typekit, talla, team, phone, email, origin } = req.body;
        if(req.role === "admin" || req.role === "user") {
            await Forms.update({nameForm, nameUser, nameUser2, lastnameone, lastnametwo, birthday, category1, typekit, talla, team, phone, email, origin},{
                where: {
                    id: form.id
                }
            });
        }else{
            if(req.userId !== form.userId) return res.status(403).json({msg: "Acceso denegado"});
            await Forms.update({nameForm, nameUser, nameUser2, lastnameone, lastnametwo, birthday, category1, typekit, talla, team, phone, email, origin},{
                where: {
                    [Op.and] : [{id: form.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Formulario actualizado correctamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteForm = async (req, res) => {
    try {
        const form = await Forms.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!form) return res.status(404).json({msg: "Datos no encontrados"});
        const { nameForm, nameUser, nameUser2, lastnameone, lastnametwo, birthday, category1, typekit, talla, team, phone, email, origin } = req.body;
        if(req.role === "admin" || req.role === "user") {
            await Forms.destroy({
                where: {
                    id: form.id
                }
            });
        }else{
            if(req.userId !== form.userId) return res.status(403).json({msg: "Acceso denegado"});
            await Forms.destroy({
                where: {
                    [Op.and] : [{id: form.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Formulario eliminado correctamente"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
