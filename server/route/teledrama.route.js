import { Router } from 'express';
import { createTeledramaController, viewTeledramaController, updateTeledramaController, deleteTeledramaController} from "../controllers/teledrama.controller.js";
import auth from '../middleware/auth.js';

const teledramaRouter = Router();

teledramaRouter.post('/create', auth, createTeledramaController);
teledramaRouter.get('/view/:id', viewTeledramaController);
teledramaRouter.put('/update/:id', auth, updateTeledramaController);
teledramaRouter.delete('/delete/:id', auth, deleteTeledramaController);

export default teledramaRouter;
