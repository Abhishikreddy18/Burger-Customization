const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const User=require('../models/Users')
const createOrderController = expressAsyncHandler(async (req, res) => {
    const { cartItems, shippingAddress, paymentMethod, orderPrice, id } = req.body;
    const user=await User.findById(id)
    if(!user)
        {
            return res.status(404).json({ message: 'User not found' });
        }
    const orderItems = cartItems.map(item => ({
        name: item.burger.name,
        qty: item.quantity,
        price: item.totalPrice,
        image: 'https://cdn.dribbble.com/userupload/9781333/file/original-020472ecdda18c6418862b973b0110de.jpg',
        product: item.burger._id,
        selectedIngredients: item.selectedIngredients
    }));
    console.log(user.email)
    const order = new Order({
        User: id,
        email:user.email,
        orderItems: orderItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        totalprice: orderPrice,
        isPaid: true,
        paidAt: Date.now()
    });

    try {
        const createdOrder = await order.save();
        res.status(201).json({ message: 'Order created', order: createdOrder });
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error: error.message });
        console.log(error);
    }
});
const getOrdersControllers = expressAsyncHandler(async (req, res) => {
   try {
       const userId = req.query.userId;

       if (!userId) {
           throw new Error("User ID is required");
       }
       const orders = await Order.find({ User: userId });
      // throw new Error("No orders found");
      console.log(orders)
       res.json(orders);
   } catch (error) {
       res.status(400).json({ message: 'Error getting orders', error: error.message });
   }
});

module.exports = {createOrderController,getOrdersControllers};
