import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { uploadImage } from "./image.service";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: "Image is required",
                });
            }

            const image = await uploadImage(req.file, req.user!.id);

            return res.status(201).json(image);
        } catch (error) {
            return res.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Failed to upload image",
            });
        }
    }
);

export default router;