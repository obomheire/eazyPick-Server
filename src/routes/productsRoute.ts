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
import {storage, fileFilter} from "../utils/imageUploads";
import multer from "multer";

const uploadOptions = multer({ storage, fileFilter });

// Products Routes
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", uploadOptions.single("image"), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/get/count", getProductCount);
router.get("/get/featured", getProductFeatured);
router.get("/get/featured/:count", getProductFeaturedCount);

export default router;
