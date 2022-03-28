const router = require('express').Router();
const User = require('../models/RegisterModel')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const pass = await bcrypt.compare(req.body.password, user.password);
    
            if (!pass) {
                return res.json({ err: "Incorrect password" })
            } else {
                if (!user.verified) {
                    return res.json({err: "Your Account not verified yet" })
                }
                else {
                    const token = jwt.sign({ username: user.firstname,id:user._id}, process.env.SECRETKEY);
                 
                    res.status(200).json({ msg: "login successful", token })
                }
            }
        } else {
            return res.json({ err: 'No Account found' })
        }

    } catch (error) {
        return res.json({err:error.message})
    }
   

})

module.exports = router;