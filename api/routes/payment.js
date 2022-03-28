const router = require('express').Router();
const crypto = require('crypto');



router.post('/payment', async (req, res) => {
    try {
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        generated_signature.update(req.body.razorpay_order_id + "|" + req.body.transactionid)
        if (generated_signature.digest('hex') === req.body.razorpay_signature) {
            return res.json({ msg: 'success' })
        }
    }
    catch (err) {
        console.log(err)
    }
})


module.exports = router;