import UserModel from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js"
import sendEmail from "../config/sendEmail.js"
import generatedAccessToken from "../utils/generatedAccessToken.js"
import generatedRefreshToken from "../utils/generatedRefreshToken.js"
import generatedOtp from "../utils/generatedOtp.js"
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js"
import jwt from 'jsonwebtoken'

export async function registerUserController(request,response){
    try {
        const { name, email, password } = request.body


        if (!name || !email || !password){
            return response.status(400).json({
                message : "Provide Name, Email, Password",
                error : true,
                success : false
            }) 
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return response.status(400).json({
            message: "Invalid email format",
            error: true,
            success: false,
        })
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return response.status(400).json({
                message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
                error: true,
                success: false
            })
        }

        // Checking Email is already in DB

        const user = await UserModel.findOne({ email })

        if(user){
            return response.json({
                message : "Already registered Email",
                error : true,
                success : false
            })
        }

        // Hide Password

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        // Save details to the DB

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        // Verify Email

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify Email from Green-Grass",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
            })
        })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function verifyEmailController(request,response){
    try {
        const { code } = request.body

        const user = await UserModel.findOne({ _id : code })

        if(!user){
            return response.status(400).json({
                 message : "Invalid Code",
                 error : true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({ _id : code },{
            verify_email : true
        })

        return response.json({
            message : "Verify email done",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Login controller
export async function loginController(request,response){
    try {
        const { email , password } = request.body

        if(!email || !password){
            return response.status(400).json({
                message : "Provide email, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "User not register",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
                message : "Contact Admin",
                error : true,
                success : false
            })
        }

        // Decrypt Password
        const checkPassword = await bcryptjs.compare(password,user.password)

        if(!checkPassword){
            return response.status(400).json({
                message : "Check your password",
                error : true,
                success : false
            })
        }

        const accesstoken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const cookiesOption = {
            httpOnly :true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken',accesstoken,cookiesOption)
        response.cookie('refreshToken',refreshToken,cookiesOption)

        // Save tokens to session storage
        response.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : {
                accesstoken,
                refreshToken
            }
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Logout controller
export async function logoutController(request,response){
    try {
        const userid = request.userId  // middleware

        const cookiesOption = {
            httpOnly :true,
            secure : true,
            sameSite : "None"
        }
        response.clearCookie("accessToken",cookiesOption)
        response.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })

        return response.json({
            message : "Logout Successfully",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Update user details
export async function updateUserDetails(request,response){
    try {
        const userId = request.userId // auth middleware
        const { name, email, password } = request.body

        let hashPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)
        }

        const updateUser = await UserModel.updateOne({ _id : userId },{
            ...(name && { name : name }),
            ...(email && { email : email }),
            ...(password && { password : hashPassword }),
        })

        return response.json({
            message : "Updated Successfully",
            error : false,
            success : true,
            data : updateUser
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Forgot Password not login
export async function forgotPasswordController(request,response){
    try {
        const { email } = request.body

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const otp = generatedOtp()
        const expireTime = new Date() + 60 * 60 * 1000 // 1hr

        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo : email,
            subject : "Forgot password from Green Grass",
            html : forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return response.json({
            message : "Check your Email",
            error : false,
            success : true 
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Verify forgot password otp
export async function verifyForgotPasswordOtp(request,response){
    try {
        const { email , otp } = request.body

        if(!email || !otp){
            return response.status(400).json({
                message : "Provide required field email, otp.",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const currentTime = new Date().toISOString()

        if(user.forgot_password_expiry < currentTime ){
            return response.status(400).json({
                message : "OTP is expired",
                error : true,
                success : false
            })
        }

        if(otp !== user.forgot_password_otp){
            return response.status(400).json({
                message : "Invalid OTP",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry : ""
        })

        // if otp is not expired
        // otp === user.forgot_password_otp

        return response.json({
            message : "Verify OTP successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Reset the password
export async function resetpassword(request,response){
    try {
        const { email, newPassword, confirmPassword } = request.body

        if(!email || !newPassword || !confirmPassword){
            return response.status(400).json({
                message : "Provide required fields Email, New Password, Confirm Password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(!user){
            return response.status(400).json({
                message : "Email is not available",
                error : true,
                success : false
            })
        }

        if(newPassword !== confirmPassword){
            return response.status(400).json({
                message : "New Password and Confirm Password must be same",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword,salt)

        const update = await UserModel.findOneAndUpdate(user._id,{
            password : hashPassword
        })

        return response.json({
            message : "Password updated successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Refresh token controller
export async function refreshToken(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.
        authorization?.split(" ")[1]

        if(!refreshToken){
            return response.status(401).json({
                message : "Invalid token",
                error : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.
            SECRET_KEY_REFRESH_TOKEN)

            if(!verifyToken){
                return response.status(401).json({
                    message : "Token is expired",
                    error : true,
                    success : false
                })
            }
           
            const userId = verifyToken?._id

            const newAccessToken = await generatedAccessToken(userId)

            const cookiesOption = {
                httpOnly :true,
                secure : true,
                sameSite : "None"
            }

            response.cookie('accessToken',newAccessToken,cookiesOption)

            return response.json({
                message : "New Access token generated",
                error : false,
                success : true,
                data : {
                    accessToken : newAccessToken
                }
            })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Get login user details
export async function userDetails(request,response) {
    try {
        const userId = request.userId

        console.log(userId)

        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500)({
            message : "Something is wrong",
            error : true,
            success : false
        })
    }
}

// // All user details
export async function allUsers(request,response) {
    try {
      const allUsers = await UserModel.find();
  
      return response.json({
        message: "All Users",
        data: allUsers,
        success: true,
        error: false,
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  }