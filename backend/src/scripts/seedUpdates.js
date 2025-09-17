import mongoose from "mongoose";
import { Update } from "../models/update.model.js";
import dotenv from "dotenv";

dotenv.config();

const sampleUpdates = [
  {
    title: "Multiple Enhancements Fixed for Hires (June and July 2025)",
    content: "We need to bring a fresh set of enhancements to kpb life hire- each carefully designed to help user to to do more with the email with less effort. this release focuses on small that impactful improvements that collectively drive greater recruiter productivity. and drive greater recruitment greater, operational efficiency, and hiring clarity. Hiring Team in Job Creation Re-introduced the ability to add Hiring team members during jon creation job creation. Steamlines team assignment early workflow foe better connection for importance of which out by........",
    author: "Priyank Jha",
    authorAvatar: null,
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
    date: new Date("2025-06-06"),
    tags: ["enhancements", "hiring", "productivity"]
  },
  {
    title: "Kpb Hire partners with Indeed and LinkedIn For Job Posting",
    content: "We need to bring a fresh set of enhancements to kpb life hire- each carefully designed to help user to to do more with the email with less effort. this release focuses on small that impactful improvements that collectively drive greater recruitment productivity. and drive greater recruitment greater, operational efficiency, and hiring clarity. Hiring Team in Job Creation Re-introduced the ability to add Hiring team members during jon creation job creation. Steamlines team assignment early workflow foe better connection for importance of which out by........",
    author: "Ankith",
    authorAvatar: null,
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    date: new Date("2025-07-16"),
    tags: ["partnership", "job posting", "indeed", "linkedin"]
  },
  {
    title: "New Dashboard Analytics Features Released",
    content: "We've added comprehensive analytics dashboard with real-time metrics, performance tracking, and customizable reports. This will help teams make data-driven decisions and improve overall efficiency.",
    author: "Sarah Chen",
    authorAvatar: null,
    imageUrl: null,
    date: new Date("2025-07-20"),
    tags: ["analytics", "dashboard", "metrics"]
  },
  {
    title: "Security Updates and Bug Fixes",
    content: "Important security patches have been applied to address vulnerabilities. We've also fixed several bugs reported by users, improving overall system stability and performance.",
    author: "Mike Rodriguez",
    authorAvatar: null,
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    date: new Date("2025-07-18"),
    tags: ["security", "bug fixes", "stability"]
  }
];

const seedUpdates = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing updates
    await Update.deleteMany({});
    console.log("Cleared existing updates");

    // Insert sample updates
    const result = await Update.insertMany(sampleUpdates);
    console.log(`Inserted ${result.length} sample updates`);

    console.log("Sample updates seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding updates:", error);
    process.exit(1);
  }
};

seedUpdates();
