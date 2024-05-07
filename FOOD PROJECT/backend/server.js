import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";


//app config 
const app = express()
const port = 4000;

//middlewares
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)


app.get("/", (req, res) => res.status(200).send("API working"))

app.post("/signin", (req, res) => {
    res.status(200).send("hello world")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
});

// mongodb+srv://aryanpatel1882003:LUguaSnJe5qLt50D@cluster0.wbe9bop.mongodb.net/?