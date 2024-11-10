import express from "express";
import {
    getRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
} from "../controllers/RoutesC.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/routes', verifyUser, getRoutes);
router.get('/routes/:id', verifyUser, getRouteById);
router.post('/routes', verifyUser, adminOnly, createRoute);
router.patch('/routes/:id', verifyUser, adminOnly, updateRoute);
router.delete('/routes/:id', verifyUser, adminOnly, deleteRoute);

export default router;