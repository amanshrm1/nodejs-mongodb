const router = require('express').Router();
const User = require('../models/user');
const Order = require('../models/order');

router.post('/register', async (req, res) => {
  const user = new User({
    userId: req.body.userId,
    name: req.body.name,
    numberOfOrders: req.body.numberOfOrders 
  })

  try {
    await user.save();
    res.json({'status': 'Success'});
  } catch (error) {
    res.send(error);
  }
});

router.get('/allordersuserwise', async (req, res) => {
  try {
    
    const users = await User.find();
    const orders = await Order.find();

    for(let user in users) {
      let orderList = orders.filter( order => {
        return order.userId == users[user].userId
      })

      await User.updateOne(
        { userId: users[user].userId},
        { $set: {
          numberOfOrders: orderList.length
        }}
      )
    };
    
    res.json({"status": "User table successfully updated"})
  } catch (error) {
    res.json({"status":"Unable to update user table"});
  }
});

router.get('/:userId', async (req, res) => {
  try {
    
    const user = await User.find({ userId: req.params.userId });
    res.send(user);
  
  } catch (error) {

    res.json({"status":"Unable to get list"});
  
  }
})

module.exports = router






