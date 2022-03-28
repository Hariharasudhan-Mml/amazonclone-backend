const mongoose=require('mongoose');

const schema=mongoose.Schema({
    id:Number,
    img:String,
    desc:String,
    salePrice:String,
    brand:String,
    rating:String,
    orderPlaced:{
        type:Boolean,
        default:false
    },
    paid:{
        type:Boolean,
        default:false
    },
    delivered:{
        type:Boolean,
        default:false
    }
})

const Cart=mongoose.model('cartitems' , schema)

module.exports=Cart
