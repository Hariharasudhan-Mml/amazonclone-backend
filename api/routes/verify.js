const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/RegisterModel');

router.get('/verify/:token',async (req, res) => {
    try {
        jwt.verify(req.params.token, process.env.SECRETKEY, async (err, decoded) => {
            if (err) {
                return res.json({ msg: err.message })
            }
            console.log(decoded.id)
            const one=User.findById(decoded.id);
            console.log(one)
             await User.findByIdAndUpdate({ _id: decoded.id }, { verified: true }, { new: true }).then(response=>{
                 res.json({ msg: "Account verified Successfully, login to use our platform" })
            })
        })
        
    } catch (error) {
        
        console.log(error)
        res.json({msg:error.message})
    }
   

})


module.exports=router;