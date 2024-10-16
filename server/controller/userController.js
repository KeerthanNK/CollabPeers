import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from '../model/userschema.js'
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

    const newUser = await User.create({
      name,
      email,
      password,
      cpassword,
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
const authUser = async (req,res)=>{

  try{
    const { email , password } = req.body;
     if(!email || !password)
       {
           return res.status(400).json({error : "Fill credentials"});
       } 
     const user = await User.findOne({email:email});
     const isMatch  = await bcrypt.compare(password  , user.password);
     
     if(!user)
     {
       res.status(400).json({error:"invalid credentials"});
     }
     else if(!isMatch) res.status(400).json({error:"invalid credentials"});
     else{
       const token = await user.generateAuthToken();
       //console.log(token);
       res.cookie("jwtoken" , token , {
          expires : new Date(Date.now() + 25000000000),
          httpOnly : true
       });
       res.status(201).json({message:"signin successfull",token,user});
     }
  } catch(err){
   console.log(err);
  }
};

export {registerUser,authUser};
