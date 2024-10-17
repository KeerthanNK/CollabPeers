import express from "express";
import { createProj, getUserProject } from "../controller/projController.js";

const router = express.Router();

router.post("/postproj", createProj);

router.get("/proj/my-project", getUserProject);

export { router as projRouter };
