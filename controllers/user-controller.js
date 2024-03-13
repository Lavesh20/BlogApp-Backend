import User from "../model/User";
import bcrypt from 'bcryptjs'
const getAllUsers = async (req,res,next)=>{
    let users;
    try{
        users = await User.find();
    } catch(err){
        console.log("Error")
    }
    if(!users){
        return res.status(404).json({
            message:"No users found"
        })
    }
    return res.status(200).json({users})
}
export default getAllUsers;

export const signup = async(req,res,next)=>{
 const {name,email,password} = req.body;
 let existingUser;
 try{
    existingUser = await User.findOne({email})
 } catch (err){
  console.log("Error")
 }
 if(existingUser){
 res.status(400).json({
    message:"User already exists"
 })
 }
 const hashPassword = bcrypt.hashSync(password)
 const user = new User({
    name:name,
    email:email,
    password:hashPassword,
    blog:[]
 })

try{
  await  user.save();
} catch (err){
    console.log(err)
}
res.status(201).json({
    message:"User created!",
    user: {user}
})

}

export const login = async(req,res,next)=>{
    const {email,password} = req.body;
    let existingUser;
    try{
       existingUser = await User.findOne({email})
    } catch (err){
     console.log("Error")
    }
    if(!existingUser){
        return res.status(404).json({
            message:"User not found",
        });
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"Incorrect Password"
        })
    }
    return res.status(200).json({
        message:"Login Successfull"
    })
}
