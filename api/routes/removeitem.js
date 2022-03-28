const AuthMiddleware = require('../middlewares/Authmiddleware');
const Cart = require('../models/CartModel');
const User = require('../models/RegisterModel');
const router = require('express').Router();


router.post('/removeitem', AuthMiddleware, async (req, res) => {
    try {
        const itemId = req.body.id;
        const removedItem = await Cart.findOneAndDelete({ id: itemId });
        console.log(removedItem)
        const updated = await Cart.find({});
        return res.json({ items: updated });
    } catch (error) {
        console.log(error)
    }

}
)


module.exports = router;