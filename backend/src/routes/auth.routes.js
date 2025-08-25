import { Router } from "express";
import {
    registerUser,
    globalLogin,
    superLogin,
    adminLogin,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    verifyUserSession,
    googleLogin
} from "../controllers/auth.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

// Public routes
router.route("/register").post(registerUser)
router.route("/globallogin").post(globalLogin)
router.route("/superlogin").post(superLogin)
router.route("/adminlogin").post(adminLogin)
router.route("/google-login").post(googleLogin)
router.route("/refresh-token").post(refreshAccessToken)

// Protected routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/verify-session").get(verifyJWT, verifyUserSession)

export default router;
