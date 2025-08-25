import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config();

const seedUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('Connected to MongoDB');

        // Clear existing users (optional)
        // await User.deleteMany({});
        // console.log('Existing users cleared');

        // Create sample users
        const users = [
            {
                fullName: "Global Administrator",
                userName: "globaladmin",
                email: "global@admin.com",
                password: "password123",
                role: "global"
            },
            {
                fullName: "Super Administrator", 
                userName: "superadmin",
                email: "super@admin.com",
                password: "password123",
                role: "super"
            },
            {
                fullName: "Admin User",
                userName: "adminuser",
                email: "admin@user.com", 
                password: "password123",
                role: "admin"
            }
        ];

        // Check if users already exist
        for (const userData of users) {
            const existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                const user = new User(userData);
                await user.save();
                console.log(`Created user: ${userData.email} with role: ${userData.role}`);
            } else {
                console.log(`User already exists: ${userData.email}`);
            }
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
