import express from "express";
const router = express.Router();
import {
  getCategories,
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/categoriesController";

// APP ROUTE
router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
