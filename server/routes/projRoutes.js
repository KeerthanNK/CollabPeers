import express from "express";
import { createProj } from "../controller/projController.js";

const router = express.Router();

router.post("/postproj", createProj);

export { router as projRouter };
