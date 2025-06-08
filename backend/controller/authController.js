import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";


export const signup = async (req, res) => {
 try {
   const {email, password, name,username,gender } = req.body;

   // if (!email || !password || !name || username) {
   //   throw new Error("All fields are required");
   // }

   const userAlreadyExists = await User.findOne({ email });


   if (userAlreadyExists) {
     return res
       .status(400)
       .json({ success: false, message: "User already exists" });
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
   const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  

   const user = new User({
     email,
     password: hashedPassword,
     name,username,gender,
     imageUrl: gender === "male"? boyProfilePic : girlProfilePic,
   });

   await user.save();



   // jwt
   // generateTokenAndSetCookie(res, user._id);

   const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
     expiresIn: "10d",
   });
   

  
   res.status(201).json({
     success: true,
     status: 200,
     message: "User created successfully",
     user: {
       ...user._doc,
       password: undefined,
       accessToken: accessToken,
      //  _id: user._id,
      //  name: user.name,
      //  gender: user.gender,
      //  imageUrl: user.imageUrl,
      //  username: user.username
     },
   });

 

 } catch (error) {
   res.status(400).json({ success: false, message: error.message });
 }
};


export const login = async (req, res) => {
 const { email, password } = req.body;
 console.log(req.body, "login body");
 try {
   const user = await User.findOne({ email });
   if (!user) {
     return res
       .status(400)
       .json({ success: false, message: "Invalid credentials" });
   }
   const isPasswordValid = await bcrypt.compare(password, user?.password);
   if (!isPasswordValid) {
     return res
       .status(400)
       .json({ success: false, message: "Invalid credentials" });
   }

   // generateTokenAndSetCookie(res, user._id);

   const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
     expiresIn: "10d",
   });

   user.lastLogin = new Date();
   await user.save();

   res.status(200).json({
     success: true,
     message: "Logged in successfully",
     user: {
       ...user._doc,
       password: undefined,
       accessToken: accessToken,
     },
   });
 } catch (error) {
   console.log("Error in login ", error);
   res.status(400).json({ success: false, message: error.message });
 }
};