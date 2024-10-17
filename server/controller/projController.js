import jwt from "jsonwebtoken";
import Proj from "../model/projSchema.js";

export const createProj = async (req, res) => {
  try {
    const { projectname, description, availableSlots, technology, roles } =
      req.body;

    if (
      !projectname ||
      !description ||
      !availableSlots ||
      !technology ||
      !roles
    ) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const Email = decoded.email;
    console.log(Email + "email");

    const proj = await Proj.create({
      projectname,
      description,
      availableSlots,
      technology,
      collegename: decoded.collegename,
      year: decoded.year,
      roles,
      email: Email,
    });

    res.status(201).json({ msg: "Project created successfully", proj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserProject = async (req, res) => {
  try {
    const Token = req.headers.authorization?.split(" ")[1];
    if (!Token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(Token, process.env.SECRET_KEY);

    const Email = decoded.email;

    const getAll = await Proj.find({ email: Email });

    res.status(200).json({ msg: "All projects ", getAll });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" + err });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const getAll = await Proj.find({});
    res.status(200).json({ msg: "All projects ", getAll });
  } catch (err) {
    res.status(500).send(err);
  }
};
