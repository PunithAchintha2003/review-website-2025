import uploadImageClodinary from "../utils/uploadImageClodinary.js"

const uploadImageController = async(request, response) => {
    try {
        const file = request.file;

        if (!file) {
            console.error("No file provided in the request"); // Log missing file error
            return response.status(400).json({
                message: "No file provided",
                error: true,
                success: false
            });
        }

        const uploadImage = await uploadImageClodinary(file);

        return response.json({
            message: "Upload done",
            data: uploadImage,
            success: true,
            error: false
        });
    } catch (error) {
        console.error("Error in uploadImageController:", error); // Log any caught exceptions
        return response.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

export default uploadImageController