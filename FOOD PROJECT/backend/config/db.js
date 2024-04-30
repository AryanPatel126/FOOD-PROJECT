import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://aryanpatel1882003:LUguaSnJe5qLt50D@cluster0.wbe9bop.mongodb.net/food-del').then(()=>{
        console.log("DB Connected")
    })
}