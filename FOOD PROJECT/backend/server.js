import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";


//app config 
const app = express()
const port = 3000;

//middlewares
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.get("/", (req, res) => res.status(200).send("API working"))

app.post("/signin", (req, res) => {
    res.status(200).send("hello world")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
});

// mongodb+srv://aryanpatel1882003:LUguaSnJe5qLt50D@cluster0.wbe9bop.mongodb.net/?