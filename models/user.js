const mongoose = require('mongoose');

var userInfo = new mongoose.Schema({
  userId: {
		type: Number,  
		required: true,
    unique: true
	},
  name: {
		type: String,
		required: true,
		min: 10
	},
  numberOfOrders: {
		type: Number,
		required: true,
    default: 0
	}
});

module.exports =  mongoose.model('user', userInfo);
