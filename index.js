import  express  from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
const app = express();

app.use(express.json())

mongoose.connect("mongodb+srv://laveshvyas20:HYfPIVV7timUKqPN@cluster0.frfboac.mongodb.net/Blogs")
.then(()=>app.listen(3000,()=>console.log("Server Running")))
.catch((err)=>{console.log("Something Wrong")})
    

// app.use('/',(req,res,next)=>{
//     res.send("Hello world")
// });

app.use('/',router);