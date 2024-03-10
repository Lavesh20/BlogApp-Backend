import mongoose, { Schema } from "mongoose";

const Schema = new Schema();

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    descrption:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})

export default mongoose.model("Blog",blogSchema);