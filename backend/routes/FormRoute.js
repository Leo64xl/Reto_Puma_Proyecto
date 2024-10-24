import express from "express";
import {
    getForms,
    getFormById,
    createForm,
    updateForm,
    deleteForm,
} from "../controllers/Forms.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/forms', verifyUser, getForms);
router.get('/forms/:id', verifyUser, getFormById);
router.post('/forms', verifyUser, createForm);
router.patch('/forms/:id', verifyUser, updateForm);
router.delete('/forms/:id', verifyUser, deleteForm);

export default router;