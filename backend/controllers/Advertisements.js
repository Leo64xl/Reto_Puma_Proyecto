import Advertisements from "../models/AdvertisementsModel.js";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getAdvertisements = async(req, res) => {
    try {
        let response;
        if(req.role === "user" || req.role === "admin") {
            response = await Advertisements.findAll({
                attributes: ['uuid', 'name', 'image', 'url', 'description'],
                include: [{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }else{
            response = await Advertisements.findAll({
                attributes: ['uuid', 'name', 'image', 'url', 'description'],
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

export const getAdvertisementById = async(req , res) => {
    try {
        const advertisement = await Advertisements.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!advertisement) return res.status(404).json({msg: "Datos no encontrados"});
        let response;
        if(req.role === "user" || req.role === "admin") {
            response = await Advertisements.findOne({
                attributes: ['uuid', 'name', 'image', 'url', 'description'],
                where: {
                id: advertisement.id
            },
                include: [{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }else{
            response = await Advertisements.findOne({
                attributes: ['uuid', 'name', 'image', 'url', 'description'],
                where: {
                    [Op.and] : [{id: advertisement.id}, {userId: req.userId}]                    
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

export const createAdvertisement = async(req, res) => {
    const {name, description} = req.body;
    
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({msg: "No se subió ninguna imagen"});
    }

    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Tipo de archivo no permitido"});
    if (fileSize > 5000000) return res.status(422).json({msg: "La imagen debe ser menor a 5MB"});

    const filePath = `./uploads/${fileName}`;
    file.mv(filePath, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });

        try {
            await Advertisements.create({
                name,
                image: fileName,
                url: `${req.protocol}://${req.get("host")}/uploads/${fileName}`,
                description,
                userId: req.userId
            });
            res.status(201).json({ msg: "Producto creado correctamente" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
}

export const updateAdvertisement = async(req, res) => {
    try {
        const advertisement = await Advertisements.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!advertisement) return res.status(404).json({ msg: "Datos no encontrados" });

        const { name, description } = req.body;
        let fileName = advertisement.image; // Mantener el nombre de la imagen existente

        if (req.files && req.files.image) {
            const file = req.files.image;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Imagen no válida." });
            if (fileSize > 5000000) return res.status(422).json({ msg: "La imagen debe ser menor a 5 MB." });

            const filePath = `./uploads/${fileName}`;

            // Eliminar la imagen anterior
            if (advertisement.image) {
                const oldPath = `./uploads/${advertisement.image}`;
                fs.unlink(oldPath, (err) => {
                    if (err) console.error(`Error al eliminar la imagen: ${err.message}`);
                });
            }

            file.mv(filePath, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });
        }

        await Advertisements.update(
            {
                name,                
                image: fileName,
                url: `${req.protocol}://${req.get("host")}/uploads/${fileName}`,
                description,        
            },
            {
                where: {
                    id: advertisement.id
                }
            }
        );

        res.status(200).json({ msg: "Anuncio actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteAdvertisement = async(req, res) => {
    try {
        const advertisement = await Advertisements.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!advertisement) return res.status(404).json({ msg: "Datos no encontrados" });

        // Eliminar la imagen del sistema
        if (advertisement.image) {
            const filePath = `./uploads/${advertisement.image}`;
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Error al eliminar la imagen: ${err.message}`);
            });
        }

        await Advertisements.destroy({
            where: {
                id: advertisement.id
            }
        });
        res.status(200).json({ msg: "Anuncio eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}