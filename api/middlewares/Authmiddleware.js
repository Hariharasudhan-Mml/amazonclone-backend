const User=require('../models/RegisterModel');
const jwt=require('jsonwebtoken');


 const AuthMiddleware=(req,res,next)=>{
console.log(req.headers)
console.log(req.body)
    const token=req.headers.authorization;
    console.log(token);
    console.log(process.env.SECRETKEY)
    jwt.verify(token,process.env.SECRETKEY,(err,decoded)=>{
        if(err){
            return res.json({msg:err.message})
        }
        else{
            console.log(decoded)
            req.id=decoded.id;
            next()
        }
    })
}

module.exports=AuthMiddleware;