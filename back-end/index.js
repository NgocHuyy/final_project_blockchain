const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const userRoute = require('./routes/authRoute.js');
const productRoute = require('./routes/productRoute.js');

const PORT = 5000;

MONGODB_URL= 'mongodb+srv://blockchain:blockchainblockchainblockchain@cluster0.l2ixl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(
    MONGODB_URL, 
    { useNewUrlParser: true }
  )
  .then((result) => console.log("Connection"))
  .catch((error) => console.log('Error'));

app.use(express.json());
app.use(cors());

//API
app.use('/auth', userRoute);
app.use('/api/products', productRoute);

app.listen(PORT,()=>{
    console.log(`Server is runningon PORT ${PORT}`);
});
