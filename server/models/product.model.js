import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    image : {
        type : Array,
        default : []
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
    director: {
        type: String,
        default : ""
    },
    publish : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true
})

//create a text index
productSchema.index({
    name  : "text",
    description : 'text'
},{
    name : 10,
    description : 5
})


const ProductModel = mongoose.model('product',productSchema)

export default ProductModel