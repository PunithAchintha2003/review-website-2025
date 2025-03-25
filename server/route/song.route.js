import { Router } from 'express'
import { createSongController, updateSongController, deleteSongController, viewSongController } from "../controllers/songs.controller.js";
import auth from '../middleware/auth.js';

const songRouter = Router()

songRouter.post('/create', auth, createSongController)
songRouter.put('/update/:songId', auth, updateSongController)
songRouter.delete('/delete/:songId', auth, deleteSongController)
songRouter.get('/view/:songId', viewSongController)

export default songRouter
