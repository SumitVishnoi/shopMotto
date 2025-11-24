// routes/order.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// COD or manual order save
router.post("/placeorder", async (req, res) => {
  try {
    const { address, items, amount, paymentMethod } = req.body;

    const order = new Order({
      address,
      items,
      amount,
      paymentMethod,
      status: paymentMethod === "COD" ? "Pending" : "Paid",
    });

    await order.save();
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

export default router;
