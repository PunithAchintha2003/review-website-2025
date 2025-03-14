import { Router } from 'express'
import { createSongController, updateSongController, deleteSongController, viewSongController } from "../controllers/songs.controller.js";
import auth from '../middleware/auth.js';

const songRouter = Router()

songRouter.post('/create', auth, createSongController)
songRouter.put('/update/:id', auth, updateSongController)
songRouter.delete('/delete/:id', auth, deleteSongController)
songRouter.get('/view/:id', viewSongController)

export default songRouter
