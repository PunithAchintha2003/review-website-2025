import { Router } from 'express';
import { createTeledramaController, viewTeledramaController, updateTeledramaController, deleteTeledramaController, getAllTeledramasController } from "../controllers/teledrama.controller.js";
import auth from '../middleware/auth.js';

const teledramaRouter = Router();

teledramaRouter.get('/', getAllTeledramasController);
teledramaRouter.post('/create', auth, createTeledramaController);
teledramaRouter.get('/view/:id', viewTeledramaController);
teledramaRouter.put('/update/:id', auth, updateTeledramaController);
teledramaRouter.delete('/delete/:id', auth, deleteTeledramaController);

export default teledramaRouter;
