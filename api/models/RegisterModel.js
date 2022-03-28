const mongoose = require('mongoose');


const RegisterSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified:{
        type:Boolean,
        default:false,
    },
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:'cartitems',
        default:null
    }]
}, {timestamps:true})


const User = mongoose.model('users', RegisterSchema);
module.exports = User;