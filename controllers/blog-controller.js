import mongoose from 'mongoose';
import Blog from '../model/Blog'
import User from '../model/User';
let blogs;
export const getAllBlogs = async(req,res,next)=>{
   
    try{
         blogs =await Blog.find();
    } catch (err){
        console.log(err)
    }
    if(!blogs){
       return res.status(404).json({
            message:"No blogs found"
        })
    }
    return res.status(200).json({ blogs})
}


export const addBlog = async(req,res,next)=>{
     const {title,description,image,user} = req.body;
     let existingUser;
     try{
      existingUser = await User.findById(user);
      } catch(err){
        console.log(err)
      }
      if(!existingUser){
        res.status(500).json({
          message:"Unable to find the user by this id"
        })
      }
     const blog = new Blog({
        title,
        description,
        image,
        user
     })
     try{
       const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
       existingUser.blogs.push(blog);
       await existingUser.save({session});
       await session.commitTransaction();

     } catch(err){
          console.log(err)
          res.status(500).json({err})
     }
     return res.status(200).json({blog})
}

export const updateBlog = async(req,res,next)=>{
    const blogId = req.params.id;
    const {title, description} = req.body;
    let blog;
    try{
     blog = await Blog.findByIdAndUpdate(blogId,{
              title,
              description}
            )} catch(err){
        return console.log(err)
    }
    if(!blog){
      return  res.status(500).json({
            message:"Unable to update the blog"
        })
    }
    return res.status(200).json({blog})
}

export const getById = async(req,res,next)=>{
  const Id = req.params.id;
  let blog;
  try{
   blog = await Blog.findById(Id);
  } catch(err){
    return console.log(err)
  }
  if(!blog){
    return res.status(404).json({
        message:"No blog found"
    })
  }
  return res.status(200).json({blog})
}

export const deleteBlog = async(req,res,next)=>{
  const id = req.params.id;
  let blog;
  try{
     blog =await Blog.findByIdAndDelete(id);
  } catch(err){
    console.log(err)
  }
  if(!blog){
    res.status(500).json({
      message:"Unable to delete"
    })
  }
  res.status(200).json({message:"Successfully deleted"})
}
