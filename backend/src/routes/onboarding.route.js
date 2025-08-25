import { Router } from "express";
import { createCollegeDetails, getAllCollegeDetails, getCollegeDetailsById } from "../controllers/onboarding.controller.js";

const router = Router();

router.route("/college").post(createCollegeDetails).get(getAllCollegeDetails);
router.route("/college/:id").get(getCollegeDetailsById);

export default router;
