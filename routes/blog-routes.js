import express from "express"
import { getAllBlogs, addBlog, updateBlog } from '../controllers/blog-controller'

const Blogrouter = express.Router();

Blogrouter.get('/',getAllBlogs)
Blogrouter.post('/add',addBlog)
Blogrouter.put('/update/:id',updateBlog)

export default Blogrouter