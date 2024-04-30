import mongoose from "mongoose";


//schema
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, //to store product img url
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

//model created once so when file run again then model created again so  solve this one  -> mongoose.models.food means if model is created then that model will used if not then model will be created . 
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
