import express from "express";
const router = express.Router();
import {
  getOrders,
  createOrder,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
  getOrderCount,
} from "../controllers/ordersController";

// Orders Routes
router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrderStatus);
router.get("/get/count", getOrderCount);
router.get("/get/totalsales", getTotalSales);

export default router;
