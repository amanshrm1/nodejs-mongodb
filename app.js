require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require('./routes/user');
const Orders = require('./routes/order');

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/user', Users);
app.use('/order', Orders);

//mongoose connection
mongoose.connect( process.env.mongodb_url, () => console.log('connect to db'));

app.listen(process.env.PORT, () => console.log(`app is listning at ${process.env.PORT}`))

/* NOTE :- please have a look at .router_Explanation */

