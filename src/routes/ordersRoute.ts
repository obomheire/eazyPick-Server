import express from "express";
const router = express.Router();
import {
  getOrders,
  createOrder,
  getOrder,
} from "../controllers/ordersController";

// Orders Routes
router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);

export default router;
