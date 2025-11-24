// routes/webhook.js
import express from "express";
import Order from "../models/Order.js"; // your Mongoose Order model

const router = express.Router();

router.post("/payment-webhook", async (req, res) => {
  try {
    const { order_id, reference_id, tx_status, order_amount, order_meta, customer_details } = req.body;

    if (tx_status === "SUCCESS") {
      // Payment successful → save order
      const newOrder = new Order({
        address: customer_details,
        items: order_meta?.items || [],
        amount: order_amount,
        paymentId: reference_id,
        orderId: order_id,
        status: "Paid",
        paymentMethod: "Cashfree"
      });

      await newOrder.save();
      return res.status(200).send("Order saved successfully");
    }

    return res.status(400).send("Payment failed or invalid");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

export default router;
