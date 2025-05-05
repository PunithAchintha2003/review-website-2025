import Stripe from "../config/stripe.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";

export async function paymentController(request,response){
    try {
        const userId = request.userId // auth middleware 

        const user = await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
          }

        const PREMIUM_PRICE = parseInt(process.env.PREMIUM_PRICE || "1000") * 100

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            customer_email : user.email,
            line_items: [
                {
                  price_data: {
                    currency: 'lkr',
                    product_data: {
                      name: 'Premium Membership',
                      description: 'Access to all premium features',
                    },
                    unit_amount: PREMIUM_PRICE,
                  },
                  quantity: 1,
                },
              ],
            metadata : {
                userId : userId,
            },
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await Stripe.checkout.sessions.create(params)

        return response.status(200).json(session)

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

const getOrderProductItems = async ({
    userId,
    paymentId,
    payment_status,
  }) => {
    const orderItem = {
      userId: userId,
      orderId: `ORD-${new mongoose.Types.ObjectId()}`,
      paymentId: paymentId,
      payment_status: payment_status,
    };
  
    return [orderItem]; // return as array for compatibility with insertMany if needed
  };

//http://localhost:8080/api/order/webhook
export async function webhookStripe(request,response){
    const event = request.body;
    const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY

    console.log("event",event)

    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
    const session = event.data.object;

    if (session.metadata?.isPremium === 'true') {
        const userId = session.metadata.userId;

        // Create premium membership order
        const orderItems = getOrderProductItems({
            userId,
            paymentId: session.payment_intent,
            payment_status: session.payment_status,
          });

          await OrderModel.insertMany(orderItems);

        // Save the premium order
        await OrderModel.create({
        userId,
        paymentId: session.payment_intent,
        payment_status: session.payment_status,
        });

        // Update user to premium
        await UserModel.findByIdAndUpdate(userId, { isPremium: true });

        console.log(" Premium Membership activated for user:", userId);
    }

    break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
}