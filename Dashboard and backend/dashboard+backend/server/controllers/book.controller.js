import bookModel from "../models/book.model.js";

// Create Book
export async function createBookController(request, response) {
    try {
        const { title, description, image, rating, author, genre, publisher, publicationDate, ISBN, pageCount, language } = request.body;

        if (!title || !image || !author) {
            return response.status(400).json({
                message: "Provide all required fields",
                error: true,
                success: false
            });
        }

        const newBook = new bookModel(request.body);
        const save = await newBook.save();

        return response.json({
            message: "Book created successfully",
            error: false,
            success: true,
            data: save
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Update Book
export async function updateBookController(request, response) {
    try {
        const { bookId } = request.params;
        const updateData = request.body;

        const updateBook = await bookModel.findByIdAndUpdate(bookId, updateData, { new: true });

        if (!updateBook) {
            return response.status(404).json({
                message: "Book not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Book updated successfully",
            error: false,
            success: true,
            data: updateBook
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Delete Book
export async function deleteBookController(request, response) {
    try {
        const { bookId } = request.params;

        const deleteBook = await bookModel.findByIdAndDelete(bookId);

        if (!deleteBook) {
            return response.status(404).json({
                message: "Book not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Book deleted successfully",
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// View Book
export async function viewBookController(request, response) {
    try {
        const { bookId } = request.params;

        const book = await bookModel.findById(bookId);

        if (!book) {
            return response.status(404).json({
                message: "Book not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Book retrieved successfully",
            error: false,
            success: true,
            data: book
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//View all books
export async function getAllBooksController(request, response) {
    try {
        const books = await bookModel.find();

        return response.json({
            message: "Books retrieved successfully",
            error: false,
            success: true,
            data: books
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
