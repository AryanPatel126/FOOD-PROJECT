import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";  //using that we will create authentication
import bcrypt from "bcrypt"; // to encrypt the password(hashing)
import validator from "validator";



//login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({
                success : false,
                message:"User does not exist",
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({
                success : false,
                message:"Incorrect password",
            })
        }
        const token = createToken(user._id);
        res.json({
            success : true,
            token
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error"
        })
    }
}


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        // checking - is user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({
                success : false,
                message:"User already exists",
            })
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({
                success : false,
                message:"Please enter a valid email",
            })
        } 

        if(password.length<8){
            return res.json({
                success : false,
                message:"Please enter a strong password",
            })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)  //range 5-15
        const hashedPassword = await bcrypt.hash(password, salt)

        // now we have to create the new user with the "hashed password"
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({
            success:true,
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error",
        })
    }
}

//logout user

const logoutUser = async (req, res) => {

} 

export {loginUser, registerUser, logoutUser};