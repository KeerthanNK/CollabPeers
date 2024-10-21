import express from "express";
import {
  createProj,
  DeletePost,
  filterData,
  getAllProjects,
  getUserProject,
  UpdatePost,
} from "../controller/projController.js";
import { getAllsaved, saveProject } from "../controller/savedController.js";

const router = express.Router();

router.post("/project/create", createProj);

router.get("/project/my-project", getUserProject);

router.get("/getAllProjects", getAllProjects);

router.get("/project/filterdata", filterData);

router.put("/project/update/:id", UpdatePost);

router.delete("/project/delete/:id", DeletePost);

router.post("/project/save", saveProject);

router.get("/project/savedproject", getAllsaved);

export { router as projRouter };
