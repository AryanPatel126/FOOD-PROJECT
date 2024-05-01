import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}` ;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.status(200).json({    // or res.json({sucess:true , message:"Food Added"})
            message: "Food added successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error adding food"
        })
    }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json({
            data: foods
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error fetching foods"
        })
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.status(200).json({
            message: "Food removed successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error removing food"
        })
    }
}

export { addFood, listFood, removeFood };
