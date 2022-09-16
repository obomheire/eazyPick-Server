import express from "express";
const router = express.Router();
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getProductFeatured,
  getProductFeaturedCount,
} from "../controllers/productsController";

// Products Routes
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/get/count", getProductCount);
router.get("/get/featured", getProductFeatured);
router.get("/get/featured/:count", getProductFeaturedCount);

export default router;