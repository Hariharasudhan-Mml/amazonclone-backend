const router = require('express').Router();
const Cart = require('../models/CartModel');
const User = require('../models/RegisterModel');
const AuthMiddleware = require('../middlewares/Authmiddleware');

router.get('/getitem', AuthMiddleware, async (req, res) => {
    try {
        const items = await User.findById(req.id).populate('cart').select("cart");
        if (items) {
            return res.json({ items: items.cart })
        }
        return;
    }
    catch (error) {
        console.log(error)
    }
})


module.exports = router