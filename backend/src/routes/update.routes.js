import { Router } from "express";
import {
  createUpdate,
  getAllUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
  togglePublishStatus
} from "../controllers/update.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes (no authentication required)
router.get("/", getAllUpdates);
router.get("/:id", getUpdateById);

// Protected routes (GlobalAdmin only)
router.use(verifyJWT); // Apply JWT verification middleware

router.post("/", createUpdate);
router.put("/:id", updateUpdate);
router.delete("/:id", deleteUpdate);
router.patch("/:id/toggle-publish", togglePublishStatus);

export default router;
