import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

// Register Global/Super User
const registerUser = asyncHandler(async (req, res) => {
    const {fullName, userName, email, password, role} = req.body
    
    // Validation
    if ([fullName, userName, email, password, role].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    // Check if role is valid
    if (!['global', 'super', 'admin'].includes(role)) {
        throw new ApiError(400, "Invalid role. Must be 'global', 'super', or 'admin'")
    }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    // Create user
    const user = await User.create({
        fullName,
        userName,
        email,
        password,
        role
    })

    // Remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

// Global User Login
const globalLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    
    const user = await User.findOne({
        email: email,
        role: 'global'
    })

    if (!user) {
        throw new ApiError(404, "Global user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const isProduction = process.env.NODE_ENV === 'production'
    const options = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, 
                accessToken, 
                refreshToken
            },
            "Global user logged in successfully"
        )
    )
})

// Super User Login
const superLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    
    const user = await User.findOne({
        email: email,
        role: 'super'
    })

    if (!user) {
        throw new ApiError(404, "Super user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const isProduction = process.env.NODE_ENV === 'production'
    const options = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, 
                accessToken, 
                refreshToken
            },
            "Super user logged in successfully"
        )
    )
})

// Admin User Login
const adminLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    if (!password) {
        throw new ApiError(400, "Password is required")
    }
    
    const user = await User.findOne({
        email: email,
        role: 'admin'
    })

    if (!user) {
        throw new ApiError(404, "Admin user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const isProduction = process.env.NODE_ENV === 'production'
    const options = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, 
                accessToken, 
                refreshToken
            },
            "Admin user logged in successfully"
        )
    )
})

// Logout User (Common for all roles)
const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
})

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, refreshToken: newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

// Get Current User
const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

// Verify User Session
const verifyUserSession = asyncHandler(async(req, res) => {
    const user = req.user
    
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {
            user: user,
            isAuthenticated: true,
            role: user.role
        },
        "User session is valid"
    ))
})

// LOGIN WIT GOOGLE SECTION
const googleLogin = asyncHandler(async (req, res) => {
    const { email, name, googleId, accessToken, role } = req.body;

    if (!email || !googleId || !role) {
        throw new ApiError(400, "Email, Google ID, and role are required");
    }

    // Check user exists with ths email and role
    let user = await User.findOne({
        email: email,
        role: role
    });

    if (!user) {
        // Createq new user if doesn't exista
        user = await User.create({
            email: email,
            fullName: name || email.split('@')[0],
            userName: email.split('@')[0],
            googleId: googleId,
            role: role,
            // Generate a random password for Google users
            password: Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10)
        });
    } else {
        // Update existing user with Google ID if not already set
        if (!user.googleId) {
            user.googleId = googleId;
            await user.save({ validateBeforeSave: false });
        }
    }

    // Generate tokens
    const { accessToken: jwtAccessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
    .status(200)
    .cookie("accessToken", jwtAccessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, 
                accessToken: jwtAccessToken, 
                refreshToken
            },
            "Google login successful"
        )
    );
});

export {
    registerUser,
    globalLogin,
    superLogin,
    adminLogin,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    verifyUserSession,
    googleLogin
}
