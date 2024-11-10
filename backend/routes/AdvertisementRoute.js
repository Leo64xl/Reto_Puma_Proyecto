import express from "express";
import {
    getAdvertisements,
    getAdvertisementById,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
} from "../controllers/Advertisements.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/advertisements', verifyUser, getAdvertisements);
router.get('/advertisements/:id', verifyUser, getAdvertisementById);
router.post('/advertisements', verifyUser, adminOnly, createAdvertisement);
router.patch('/advertisements/:id', verifyUser, adminOnly, updateAdvertisement);
router.delete('/advertisements/:id', verifyUser, adminOnly, deleteAdvertisement);

export default router;