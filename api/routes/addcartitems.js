const router = require('express').Router();
const AuthMiddleware = require('../middlewares/Authmiddleware');
const Cart = require('../models/CartModel');
const User = require('../models/RegisterModel')




router.post('/additems', AuthMiddleware, async (req, res) => {
    try {
        const cart = await Cart.create(req.body)
        console.log(cart);
        const updated = await User.findByIdAndUpdate({ _id: req.id }, { $push: { cart: cart._id } }, { new: true });
        console.log('updated  ' + updated);
        return res.json({ msg: 'item added' })
    } catch (err) {
        res.json({ msg: err.message })
    }


})

module.exports = router;
