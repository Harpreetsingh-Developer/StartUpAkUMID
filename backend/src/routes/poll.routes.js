import { Router } from "express";
import {
  createPoll,
  getAllPolls,
  getPollById,
  updatePoll,
  deletePoll,
  voteOnPoll,
} from "../controllers/poll.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes (no authentication required for viewing/voting)
router.get("/", getAllPolls);
router.get("/:id", getPollById);
router.post("/:id/vote/:optionId", voteOnPoll);

// Protected routes (GlobalAdmin only for creation/management)
router.use(verifyJWT);

router.post("/", createPoll);
router.put("/:id", updatePoll);
router.delete("/:id", deletePoll);

export default router;
