import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Provide Title"]
    },
    description: {
        type: String,
        required: [false, "Provide Description"]
    },
    image: {
        type: String,
        required: [true, "Provide Image"]
    },
    rating: {
        type: Number,
        required: [false, "Provide Rating"]
    },
    author: {
        type: String,
        required: [true, "Provide Author"]
    },
    genre: {
        type: String,
        required: [false, "Provide Genre"]
    },
    publisher: {
        type: String,
        required: [false, "Provide Publisher"]
    },
    publicationDate: {
        type: Date,
        required: [false, "Provide Publication Date"]
    },
    ISBN: {
        type: String,
        required: [false, "Provide ISBN"]
    },
    pageCount: {
        type: Number,
        required: [false, "Provide Page Count"]
    },
    language: {
        type: String,
        required: [false, "Provide Language"]
    }
}, {
    timestamps: true
});

const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;