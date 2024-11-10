import express from "express";
import {
    getResults,
    getResultById,
    createResult,
    updateResult,
    deleteResult,
} from "../controllers/Results.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/result', verifyUser, getResults);
router.get('/result/:id', verifyUser, getResultById);
router.post('/result', verifyUser, adminOnly, createResult);
router.patch('/result/:id', verifyUser, adminOnly, updateResult);
router.delete('/result/:id', verifyUser, adminOnly, deleteResult);

export default router;