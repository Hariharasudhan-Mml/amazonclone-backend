const router = require('express').Router()
const Razorpay = require('razorpay');
require('dotenv').config();


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

router.post('/order', async (req, res) => {
    try {
        console.log("Amount ------------" + req.body.amount)
        const options = {
            amount: req.body.amount * 100.00,
            currency: 'INR',
            receipt: 'Receipt#1',
            payment_capture: 1

        }
        instance.orders.create(options, async (err, order) => {
            if (err) {
                console.log(err)

                return res.json({ err })
            }
            else {
                // After successful attempt you can import  User model and update it with order details such as payment mode,amount
                return res.json({ order })
            }
        })

    } catch (err) {
        console.log(err)
        return res.json({ err })
    }
})


module.exports = router;