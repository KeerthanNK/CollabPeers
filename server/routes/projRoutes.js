import express from "express";
import {
  createProj,
  filterData,
  getAllProjects,
  getUserProject,
} from "../controller/projController.js";

const router = express.Router();

router.post("/project/create", createProj);

router.get("/project/my-project", getUserProject);

router.get("/getAllProjects", getAllProjects);

router.get("/project/filterdata", filterData);

export { router as projRouter };
