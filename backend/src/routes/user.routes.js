import { Router } from "express";

import {logoutUser, getCurrentUser} from "../controllers/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)

export default router;
