import express from "express";
const router = express.Router();
import { getOrders } from "../controllers/ordersController";

// APP ROUTE
router.get("/", getOrders);

export default router;
