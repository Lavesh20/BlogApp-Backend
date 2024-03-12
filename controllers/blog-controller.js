import Blog from '../model/Blog'
export const getAllBlogs = async(req,res,next)=>{
    let blogs;
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
     const blog = new Blog({
        title,
        description,
        image,
        user
     })
     try{
       await blog.save()
     } catch(err){
          console.log(err)
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
              description},
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
