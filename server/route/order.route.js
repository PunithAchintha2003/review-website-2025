import { Router } from 'express'
import auth from '../middleware/auth.js'
import { paymentController } from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post('/checkout',auth,paymentController)

export default orderRouter