import express from 'express';
import {
    createOtherController,
    updateOtherController,
    deleteOtherController,
    viewOtherController
} from '../controllers/other.controller.js';

const router = express.Router();

// Create Other
router.post('/create', createOtherController);

// Update Other
router.put('/update/:id', updateOtherController);

// Delete Other
router.delete('/delete/:id', deleteOtherController);

// View Other
router.get('/view/:id', viewOtherController);

export default router;
