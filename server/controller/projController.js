import jwt from "jsonwebtoken";
import Proj from "../model/projSchema.js";

export const createProj = async (req, res) => {
  try {
    const {
      projectname,
      description,
      availableSlots,
      technology,
      searchingFor,
    } = req.body;

    if (
      !projectname ||
      !description ||
      !availableSlots ||
      !technology ||
      !searchingFor
    ) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);

    const proj = await Proj.create({
      projectname,
      description,
      availableSlots,
      technology,
      collegename: decoded.collegename,
      year: decoded.year,
      searchingFor,
    });

    res.status(201).json({ msg: "Project created successfully", proj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
