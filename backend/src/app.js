import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()


// app.use is used when middleware is present 
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        // Allow localhost origins for development
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }
        
        // Check if origin matches CORS_ORIGIN
        if (process.env.CORS_ORIGIN === '*' || origin === process.env.CORS_ORIGIN) {
            return callback(null, true);
        }
        
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 200
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import 
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import onboardingRouter from './routes/onboarding.route.js'
import updateRouter from './routes/update.routes.js'
import pollRouter from './routes/poll.routes.js' // Import the new poll routes

// routes decleration 
// since things are seperated we use app.use to use middleware

app.use("/api", onboardingRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/updates", updateRouter)
app.use("/api/v1/polls", pollRouter) // Use the new poll routes

export { app }