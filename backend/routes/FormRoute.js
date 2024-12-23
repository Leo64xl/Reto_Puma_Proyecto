import express from "express";
import {
    getForms,
    getFormById,
    createForm,
    updateForm,
    deleteForm,
} from "../controllers/Forms.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
import ExcelJS from "exceljs";  
import Forms from "../models/FormModel.js"; 

const router = express.Router();

router.get('/forms', verifyUser, getForms);
router.get('/forms/:id', verifyUser, getFormById);
router.post('/forms', verifyUser, createForm);
router.patch('/forms/:id', verifyUser, updateForm);
router.delete('/forms/:id', verifyUser, deleteForm);

router.get('/download-excel', verifyUser, adminOnly, async (req, res) => {
    try {
        const forms = await Forms.findAll();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Forms');

        worksheet.columns = [
            { header: 'Name Competition', key: 'nameForm', width: 20 },
            { header: 'Name User', key: 'nameUser', width: 20 },
            { header: 'Second Name', key: 'nameUser2', width: 20 },
            { header: 'First Surname', key: 'lastnameone', width: 20 },
            { header: 'Second Surname', key: 'lastnametwo', width: 20 },
            { header: 'Birthday', key: 'birthday', width: 15 },
            { header: 'Category', key: 'category1', width: 15 },
            { header: 'Type of Kit', key: 'typekit', width: 15 },
            { header: 'Talla', key: 'talla', width: 10 },
            { header: 'Team', key: 'team', width: 20 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Origin', key: 'origin', width: 20 },
        ];

        forms.forEach(form => {
            worksheet.addRow(form.dataValues);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Forms.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).send('Error generating Excel file');
    }
});

router.get('/form-stats/category', verifyUser, adminOnly, async (req, res) => {
    try {
        const forms = await Forms.findAll();
        const categoryCounts = forms.reduce((acc, form) => {
            acc[form.category1] = (acc[form.category1] || 0) + 1;
            return acc;
        }, {});

        res.json(categoryCounts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas' });
    }
});

router.get('/form-stats/talla', verifyUser, adminOnly, async (req, res) => {
    try {
        const forms = await Forms.findAll();
        const tallaCounts = forms.reduce((acc, form) => {
            acc[form.talla] = (acc[form.talla] || 0) + 1;
            return acc;
        }, {});

        res.json(tallaCounts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas de tallas' });
    }
});

router.get('/form-stats/team', verifyUser, adminOnly, async (req, res) => {
    try {
        const forms = await Forms.findAll();
        const teamCounts = forms.reduce((acc, form) => {
            acc[form.team] = (acc[form.team] || 0) + 1;
            return acc;
        }, {});

        res.json(teamCounts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas de equipos' });
    }
});

router.get('/form-stats/origin', verifyUser, adminOnly, async (req, res) => {
    try {
        const forms = await Forms.findAll();
        const originCounts = forms.reduce((acc, form) => {
            acc[form.origin] = (acc[form.origin] || 0) + 1;
            return acc;
        }, {});

        res.json(originCounts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas de origen' });
    }
});

export default router;