import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// Image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) =>{
        return cb(null,`${Date.now()}${file.originalname}`) //so when we upload the file timestamp will be added to origanl filename so the our filename must be unique and stored into uploads folder , we use timestamp -> `${Date.now()}`
    }
})

const upload = multer({storage: storage})

foodRouter.post("/add", upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
