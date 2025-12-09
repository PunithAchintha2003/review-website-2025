import teledramaModel from "../models/teledrama.model.js";

// Create Teledrama
export async function createTeledramaController(request, response) {
    try {
        const { title, description, poster, headerImage, synopsis, rating, genre, releaseDate, director, producer, writer, cast, language, aspectRatio } = request.body;

        if (!title || !headerImage || !director) {
            return response.status(400).json({
                message: "Provide all required fields",
                error: true,
                success: false
            });
        }

        const newTeledrama = new teledramaModel(request.body);
        const save = await newTeledrama.save();

        return response.json({
            message: "Teledrama created successfully",
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

// Update Teledrama
export async function updateTeledramaController(request, response) {
    try {
        const { id } = request.params;
        const updateData = request.body;

        const updatedTeledrama = await teledramaModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedTeledrama) {
            return response.status(404).json({
                message: "Teledrama not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Teledrama updated successfully",
            error: false,
            success: true,
            data: updatedTeledrama
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Delete Teledrama
export async function deleteTeledramaController(request, response) {
    try {
        const { id } = request.params;

        const deletedTeledrama = await teledramaModel.findByIdAndDelete(id);

        if (!deletedTeledrama) {
            return response.status(404).json({
                message: "Teledrama not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Teledrama deleted successfully",
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

// View Teledrama
export async function viewTeledramaController(request, response) {
    try {
        const { id } = request.params;

        const teledrama = await teledramaModel.findById(id);

        if (!teledrama) {
            return response.status(404).json({
                message: "Teledrama not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Teledrama retrieved successfully",
            error: false,
            success: true,
            data: teledrama
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//View all Teledramas
export async function getAllTeledramasController(request, response) {
    try {
        const teledramas = await teledramaModel.find();

        return response.json({
            message: "Teledramas retrieved successfully",
            error: false,
            success: true,
            data: teledramas
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
