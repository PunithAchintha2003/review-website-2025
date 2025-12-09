import movieModel from "../models/movie.model.js";

// Create Movie
export async function createMovieController(request, response) {
    try {
        const { title, description, poster, headerImage, rating, synopsis, genre, releaseDate, director, producer, writer, cast, language, duration, aspectRatio } = request.body;

        if (!title || !headerImage || !director) {
            return response.status(400).json({
                message: "Provide all required fields",
                error: true,
                success: false
            });
        }

        const newMovie = new movieModel(request.body);
        const save = await newMovie.save();

        return response.json({
            message: "Movie created successfully",
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

// Update Movie
export async function updateMovieController(request, response) {
    try {
        const { movieId } = request.params;
        const updateData = request.body;

        const updateMovie = await movieModel.findByIdAndUpdate(movieId, updateData, { new: true });

        if (!updateMovie) {
            return response.status(404).json({
                message: "Movie not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Movie updated successfully",
            error: false,
            success: true,
            data: updateMovie
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Delete Movie
export async function deleteMovieController(request, response) {
    try {
        const { movieId } = request.params;

        const deleteMovie = await movieModel.findByIdAndDelete(movieId);

        if (!deleteMovie) {
            return response.status(404).json({
                message: "Movie not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Movie deleted successfully",
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

// View Movie
export async function viewMovieController(request, response) {
    try {
        const { movieId } = request.params;

        const movie = await movieModel.findById(movieId);

        if (!movie) {
            return response.status(404).json({
                message: "Movie not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Movie retrieved successfully",
            error: false,
            success: true,
            data: movie
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//View all movies
export async function getAllMoviesController(request, response) {
    try {
        const movies = await movieModel.find();

        return response.json({
            message: "Movies retrieved successfully",
            error: false,
            success: true,
            data: movies
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
