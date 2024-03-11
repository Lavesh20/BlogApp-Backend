import express from "express"
import getAllBlogs from '../controllers/blog-controller'
const Blogrouter = express.Router();

Blogrouter.get('/',getAllBlogs)

export default Blogrouter