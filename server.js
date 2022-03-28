const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const signup = require('./api/routes/signup');
const signin = require('./api/routes/signin');
const verify = require('./api/routes/verify');
const additem=require('./api/routes/addcartitems');
const getitem=require('./api/routes/getcartitems');
const removeitem=require('./api/routes/removeitem')
const order=require('./api/routes/razorpay');
const payment=require('./api/routes/payment');
const connectDB = require('./config/databaseConfig');

const app = express();
connectDB();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('success');
});
app.use('/', signup);
app.use('/', signin);
app.use('/', verify);
app.use('/', additem);
app.use('/', getitem);
app.use('/', removeitem);
app.use('/', order);
app.use('/', payment);

const PORT=process.env.PORT || '5000';
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})

