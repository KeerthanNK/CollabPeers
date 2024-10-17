import mongoose from "mongoose";

const projSchema = new mongoose.Schema(
  {
    projectname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availableSlots: {
      type: Number,
      required: true,
    },
    technology: {
      type: [String],
      enum: [
        "design",
        "figma",
        "web app",
        "mobile",
        "pwa",
        "frontend",
        "backend",
        "DevOps",
        "AI",
        "machine learning",
        "databases",
        "cloud",
        "API",
        "full-stack",
        "GPT-powered",
        "test",
        "tech",
        "html,css",
        "javascript",
        "typescript",
        "node.js",
        "react",
        "angular",
        "vue.js",
        "graphql",
        "docker",
        "kubernetes",
        "aws",
        "azure",
        "firebase",
        "mongodb",
        "sql",
        "svg",
        "dev",
        "gamedev",
        "informatique",
        "Save project",
      ],
      required: true,
    },
    collegename: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    roles: {
      type: [String],
      enum: [
        "Backend Developer",
        "Frontend Developer",
        "UI/UX Developer",
        "ML Developer",
        "Data Scientist",
        "DevOps Engineer",
      ],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Proj = mongoose.model("project", projSchema);
export default Proj;
