import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Provide Title"]
    },
    description: {
        type: String,
        required: [true, "Provide Description"]
    },
    image: {
        type: String,
        required: [true, "Provide Image"]
    },
    rating: {
        type: Number,
        required: [true, "Provide Rating"]
    },
    author: {
        type: String,
        required: [true, "Provide Author"]
    },
    genre: {
        type: String,
        required: [true, "Provide Genre"]
    },
    publisher: {
        type: String,
        required: [true, "Provide Publisher"]
    },
    publicationDate: {
        type: Date,
        required: [true, "Provide Publication Date"]
    },
    ISBN: {
        type: String,
        required: [true, "Provide ISBN"]
    },
    pageCount: {
        type: Number,
        required: [true, "Provide Page Count"]
    },
    language: {
        type: String,
        required: [true, "Provide Language"]
    }
}, {
    timestamps: true
});

const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;