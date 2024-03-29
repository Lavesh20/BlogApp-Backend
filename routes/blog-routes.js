import express from "express"
import { getAllBlogs, addBlog, updateBlog, getById, deleteBlog } from '../controllers/blog-controller'

const Blogrouter = express.Router();

Blogrouter.get('/',getAllBlogs)
Blogrouter.post('/add',addBlog)
Blogrouter.put('/update/:id',updateBlog)
Blogrouter.get('/:id',getById)
Blogrouter.delete('/:id',deleteBlog)
export default Blogrouter