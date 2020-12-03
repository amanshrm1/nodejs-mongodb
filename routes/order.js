const Order = require('../models/order');
const User = require('../models/user')
const router = require('express').Router();


router.post('/create', async (req,res) => {
  const order = new Order({
    orderId: req.body.orderId,
    userId: req.body.userId,
    subtotal: req.body.subtotal,
    date: req.body.date
  })

  try {
    await order.save();
    res.json({"status":"Success"});
  } catch (error) {
    res.json({"status":"Unable to save"});
  }
});

router.get('/userwiseorders', async (req, res) => {
  try {
    
    const users = await User.find();
    const orders = await Order.find();
    const response = [];

    for(let user in users) {
      let totalOfSubTotal = 0;
      
      const orderArray = orders.filter( order => {
        return order.userId == users[user].userId;
      });
      
      for(let eachOrder in orderArray) {
        totalOfSubTotal += orderArray[eachOrder]['subtotal']
      }

      let averageOfSubTotal = totalOfSubTotal / users[user]['numberOfOrders']

      response.push({
        userId: users[user]['userId'],
        name: users[user]['name'],
        noOfOrders: users[user]['numberOfOrders'],
        averageBillValue: averageOfSubTotal
      })

    }

    res.send(response);
  
  } catch (error) {
    res.json({"status":"Unable to get list"});
  }
})

router.get('/:orderId', async (req, res) => {
  try {
    
    const order = await Order.find({
      orderId: req.params.orderId
    })
    res.send(order);
  
  } catch (error) {
    res.json({"status":"Unable to get order"});
  }
})

module.exports = router