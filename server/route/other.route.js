import express from 'express';
import { createOtherController, updateOtherController, deleteOtherController, viewOtherController } from '../controllers/other.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createOtherController);
router.put('/update/:id', auth, updateOtherController);
router.delete('/delete/:id', auth, deleteOtherController);
router.get('/view/:id', auth, viewOtherController);

export default router;
