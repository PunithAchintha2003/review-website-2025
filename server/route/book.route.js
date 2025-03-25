import { Router } from 'express'
import { createBookController, updateBookController, deleteBookController, viewBookController } from "../controllers/book.controller.js";
import auth from '../middleware/auth.js';

const bookRouter = Router()

bookRouter.post('/create', auth, createBookController)
bookRouter.put('/update/:bookId', auth, updateBookController)
bookRouter.delete('/delete/:bookId', auth, deleteBookController)
bookRouter.get('/view/:bookId', viewBookController)

export default bookRouter
