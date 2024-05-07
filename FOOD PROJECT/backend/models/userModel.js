import mongoose from "mongoose";

//schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, {minimize:false})   // we use minimize : false to cretae cartData entry can be created withoot any data 

//model created once so when file run again then model created again so  solve this one  -> mongoose.models.food means if model is created then that model will used if not then model will be created . 
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;