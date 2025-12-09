import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Provide Name"]
    },
    email : {
        type : String,
        required : [true,"Provide Email"],
        unique : true
    },
    password : {
        type : String,
        required : [true,"Provide Password"]
    },
    refresh_token : {
        type : String,
        default : ""
    },
    verify_email : {
        type : Boolean,
        default : false
    },
    status : {
        type : String,
        enum : ["Active","Inactive","Suspended"],
        default : "Active"
    },
    forgot_password_otp : {
        type : String,
        default : null
    },
    forgot_password_expiry : {
        type : Date,
        default : ""
    },
    role : {
        type : String,
        enum : ['ADMIN',"USER","PREMIUM"],
        default : "USER"
    },
    isPremium: {
        type: Boolean,
        default: false,
      },
      
},{
    timestamps : true
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel