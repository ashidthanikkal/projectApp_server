const jwt=require("jsonwebtoken")
const users = require("../Models/usermodel")
//register logic
exports.register = async (req, res) => {
    //fetch data from req body
    var { username, email, password } = req.body
    //check user exist in

    try{
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(401).json("already registered..! please login")
        }
        else {

            const newUser = new users({
                username,
                email,
                password,
                linkedin: "",
                github: "",
                profile:""
            })
            await newUser.save()
            res.status(201).json("Account created successfully")
        }
    }
    catch{
        res.status(400).json("register api failed")
    }
}

exports.login=async(req,res)=>{
const {email,password}=req.body

try{
    const user= await users.findOne({email,password})
if(user){
    //token generation
    const token=jwt.sign({userId:user._id},process.env.SECRET_KEY)
    res.status(200).json({
        user,
        message:"login successfull",
        token
    })
}
else{
    res.status(401).json("incorrect password  or email")
}
}
catch{
    res.status(400).json("login api failed")

}
}

exports.editProfile=async(req,res)=>{
    const {username,linkedin,github,profile}=req.body
    const {_id}=req.params
    const newProfile=req.file?req.file.filename:profile

    const user=await users.findOne({_id})
    if(user){
        user.username=username
        user.linkedin=linkedin
        user.github=github
        user.profile=newProfile

        await user.save()
        res.status(200).json(user)

    }
}