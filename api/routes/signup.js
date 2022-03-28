const router = require('express').Router();
const User = require('../models/RegisterModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signup', async (req, res) => {
    try {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.json({ msg: err })
            }
            else {
                bcrypt.hash(req.body.password, salt).then(async (hash) => {
                    const user = await User.create({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash
                    }).catch((err) => res.json({ msg: err.message }))
                    if (user.email) {
                        console.log('user ==='+user.email)
                        const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);
                        const transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: "webdevsmail@gmail.com",
                                pass: "testingpurposes"
                            }
                        })

                        const sendMail = await transporter.sendMail({
                            from: 'webdevsmail@gmail.com',
                            to: req.body.email,
                            subject: "To verify your Account",
                            html: `<div>
                     <h2>We welcome you to our Platform </h2>
                    <p>click the below link link to verify your account </p>
                     <a href=https://amazon-clone-by-hari.herokuapp.com/verify/${token} >CLick here to verify</a>
                     </div>`
                        })
                        if (sendMail) {
                            console.log(sendMail)
                        }
                        return res.json({ msg: "Account created successfully" })
                    }

                })

            }

        })
    } catch (e) {
        return res.json({ msg: error.message })
    }

})
module.exports = router;


