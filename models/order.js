const mongoose = require('mongoose');

var orderInfo = new mongoose.Schema({
  orderId:{
    type: Number,  
		required: true,
    unique: true
  }, 
  userId: {
    type: Number,  
		required: true,
    unique: false
  },
  subtotal: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports =  mongoose.model('orders', orderInfo);