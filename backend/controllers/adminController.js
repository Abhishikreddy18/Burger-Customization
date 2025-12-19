const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const exportorderstoexcel = require("../Export_Services/orders_export_service");

// @desc    Get all orders (admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
const getallOrdersControllers = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Optional: export to Excel
    await exportorderstoexcel(orders);

    // Return all orders
    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res
      .status(400)
      .json({ message: "Error getting orders", error: error.message });
  }
});

// @desc    Update order status (admin)
// @route   POST /api/admin/orders/:id
// @access  Private/Admin
const updateorderControllers = expressAsyncHandler(async (req, res) => {
  const { isDelivered } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update delivery status
    order.isDelivered = isDelivered;

    // If delivered, add timestamp
    if (isDelivered === "Delivered") {
      order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();

    // Export updated list of orders
    const allOrders = await Order.find();
    await exportorderstoexcel(allOrders);

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("❌ Error updating order:", error);
    res
      .status(400)
      .json({ message: "Error updating order", error: error.message });
  }
});

module.exports = {
  getallOrdersControllers,
  updateorderControllers,
};
