import { Router } from 'express'
import { createSongController, updateSongController, deleteSongController, viewSongController, getAllSongsController } from "../controllers/songs.controller.js";
import auth from '../middleware/auth.js';

const songRouter = Router()

songRouter.get('/', getAllSongsController)
songRouter.post('/create', auth, createSongController)
songRouter.put('/update/:songId', auth, updateSongController)
songRouter.delete('/delete/:songId', auth, deleteSongController)
songRouter.get('/view/:songId', viewSongController)

export default songRouter
