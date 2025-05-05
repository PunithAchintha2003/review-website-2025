import { Router } from 'express'
import auth from '../middleware/auth.js'
import { paymentController, webhookStripe } from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post('/checkout',auth,paymentController)
orderRouter.post('/webhook',webhookStripe)

export default orderRouter