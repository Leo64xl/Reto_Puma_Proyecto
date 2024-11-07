import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, getUsers); 
router.get('/users/:id', verifyUser, getUserById);
router.post('/users', createUser );
router.patch('/users/:id', verifyUser, updateUser); //cualquiera podra editar su perfil
router.delete('/users/:id', verifyUser, deleteUser); // se podra eliminar su propio perfil 


export default router; 