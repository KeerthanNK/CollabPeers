import express from "express";
import {
  createProj,
  getAllProjects,
  getUserProject,
} from "../controller/projController.js";

const router = express.Router();

router.post("/postproj", createProj);

router.get("/proj/my-project", getUserProject);

router.get("/getAllProjects", getAllProjects);

export { router as projRouter };
