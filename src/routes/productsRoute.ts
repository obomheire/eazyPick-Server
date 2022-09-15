import express from "express";
const router = express.Router();
import { getProducts, postProducts } from "../controllers/productsController";

// APP ROUTE
router.get("/", getProducts);
router.post("/", postProducts);

export default router;