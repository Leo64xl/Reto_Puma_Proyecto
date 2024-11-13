import Products from "../models/ProductModel.js";
import Users from "../models/UsersModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getProducts = async(req, res) => { 
    try {
        let response;
        if(req.role === "user" || req.role === "admin") {
            response = await Products.findAll({
                attributes: ['uuid', 'name', 'price', 'image', 'url', 'description', 'available'],
                include: [{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }else{
            response = await Products.findAll({
                attributes: ['uuid', 'name', 'price', 'image', 'url', 'description', 'available'],
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

export const getProductById = async(req, res) => {  
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        let response;
        if(req.role === "user" || req.role === "admin") {
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'price', 'image' , 'url', 'description', 'available'],
                where: {
                id: product.id
            },
                include: [{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }else{
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'price', 'image' , 'url', 'description', 'available'],
                where: {
                    [Op.and] : [{id: product.id}, {userId: req.userId}]                    
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

export const createProduct = async (req, res) => { 
    const {name, price, description, available} = req.body;
    
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
            await Products.create({
                name,
                price,
                image: fileName,
                url: `${req.protocol}://${req.get("host")}/uploads/${fileName}`,
                description,
                available,
                userId: req.userId
            });
            res.status(201).json({ msg: "Producto creado correctamente" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Datos no encontrados" });

        const { name, price, description, available } = req.body;
        let fileName = product.image; // Mantener el nombre de la imagen existente

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
            if (product.image) {
                const oldPath = `./uploads/${product.image}`;
                fs.unlink(oldPath, (err) => {
                    if (err) console.error(`Error al eliminar la imagen: ${err.message}`);
                });
            }

            file.mv(filePath, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });
        }

        await Products.update(
            {
                name,
                price,
                image: fileName,
                url: `${req.protocol}://${req.get("host")}/uploads/${fileName}`,
                description,
                available
            },
            {
                where: {
                    id: product.id
                }
            }
        );

        res.status(200).json({ msg: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Datos no encontrados" });

        // Eliminar la imagen del sistema
        if (product.image) {
            const filePath = `./uploads/${product.image}`;
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Error al eliminar la imagen: ${err.message}`);
            });
        }

        await Products.destroy({
            where: {
                id: product.id
            }
        });
        res.status(200).json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}