import UserModel from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js"
import sendEmail from "../config/sendEmail.js"
import generatedAccessToken from "../utils/generatedAccessToken.js"
import generatedRefreshToken from "../utils/generatedRefreshToken.js"

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

        return response.json({
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