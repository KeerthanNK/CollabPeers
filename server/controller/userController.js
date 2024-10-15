import User from "./model/userschema.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, cpassword, collegename, year, course } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !cpassword ||
      !collegename ||
      !year ||
      !course
    ) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    if (password !== cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      collegename,
      year,
      course,
    });

    res.status(201).json({ msg: "User created successfully", newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export default registerUser;
