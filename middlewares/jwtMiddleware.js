const jwt= require('jsonwebtoken')

exports.jwtmiddleWare=(req,res,next)=>{
    console.log("___________JWT Middleware");

    try{
        //access token from req 
        const token=req.headers['access_token'].split(" ")[1]

        //verify
        const jwtResponse=jwt.verify(token,process.env.SECRET_KEY)

        //access the payload and store
        req.payload = jwtResponse.userId
        console.log(req.payload);
        //exit from middleware function and continue
        next()
    }
    catch{
        res.status(401).json("authentication failed ! please login")
    }
}
