import { Router } from 'express'
import { allUsers, forgotPasswordController, loginController, logoutController, refreshToken, registerUserController, resetpassword, updateUserDetails, userDetails, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/user.controller.js";
import auth from '../middleware/auth.js';

const userRouter = Router()

userRouter.post('/register',registerUserController)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.put('/update-user',auth,updateUserDetails)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetpassword)
userRouter.post('/refresh-token',refreshToken)
userRouter.get('/user-details',auth,userDetails)

// Endpoint to retrieve the accessToken from HttpOnly cookie
userRouter.get('/get-access-token', (req, res) => {
    const accessToken = req.session?.accessToken;
    const refreshToken = req.session?.refreshToken;

    if (!accessToken || !refreshToken) {
        return res.status(401).json({ message: 'Tokens not found in session storage' });
    }

    res.status(200).json({ accessToken, refreshToken });
});

// Admin Panel
userRouter.get("/all-users",auth,allUsers)

export default userRouter