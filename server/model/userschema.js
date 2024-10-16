import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    //unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  collegename: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tokens : [
    {
        token : {
          type: String,
          required: true,
        }
    }
  ]
});
userSchema.pre('save' , async function(next)  {
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,12);
    this.cpassword = await bcrypt.hash(this.cpassword,12);
  }
  next();
}); 
userSchema.methods.generateAuthToken = async function () {
   try{
      let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
       this.tokens = this.tokens.concat({ token : token});
       await this.save();
       return token;
   } catch(err){
      console.log(err);
   }
}
const Users = mongoose.model('User', userSchema);
export default Users;
