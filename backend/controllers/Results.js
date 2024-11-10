import Results from "../models/ResultModel.js";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize";

export const getResults = async (req, res) => {
    try {
        let response;
        if (req.role === "user") {
            response = await Results.findAll({
                attributes: ['uuid', 'nameCompetition', 'rider', 'teamName', 'nationality', 'category'],
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Results.findAll({
                attributes: ['uuid', 'nameCompetition', 'rider', 'teamName', 'nationality', 'category'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error al obtener los resultados:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const getResultById = async (req, res) => {
    try {
        const result = await Results.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!result) return res.status(404).json({ msg: "Datos no encontrados" });
        let response;
        if (req.role === "user") {
            response = await Results.findOne({
                attributes: ['uuid', 'nameCompetition', 'rider', 'teamName', 'nationality', 'category'],
                where: {
                    id: result.id
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Results.findOne({
                attributes: ['uuid', 'nameCompetition', 'rider', 'teamName', 'nationality', 'category'],
                where: {
                    [Op.and]: [{ id: result.id }, { userId: req.userId }]
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createResult = async (req, res) => {
    const { nameCompetition, rider, teamName, nationality, category } = req.body;
    try {
        await Results.create({
            nameCompetition,
            rider,
            teamName,
            nationality,
            category,
            userId: req.userId
        });
        res.status(201).json({ msg: "Resultado creado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateResult = async (req, res) => {
    try {
        const result = await Results.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!result) return res.status(404).json({ msg: "Datos no encontrados" });
        const { nameCompetition, rider, teamName, nationality, category } = req.body;
        if (req.role === "admin") {
            await Results.update({ nameCompetition, rider, teamName, nationality, category }, {
                where: {
                    id: result.id
                }
            });
        } else {
            if (req.userId !== result.userId) return res.status(403).json({ msg: "Acceso denegado" });
            await Results.update({ nameCompetition, rider, teamName, nationality, category }, {
                where: {
                    [Op.and]: [{ id: result.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Resultado actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteResult = async (req, res) => {
    try {
        const result = await Results.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!result) return res.status(404).json({ msg: "Datos no encontrados" });
        if (req.role === "admin") {
            await Results.destroy({
                where: {
                    id: result.id
                }
            });
        } else {
            if (req.userId !== result.userId) return res.status(403).json({ msg: "Acceso denegado" });
            await Results.destroy({
                where: {
                    [Op.and]: [{ id: result.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Resultado eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};