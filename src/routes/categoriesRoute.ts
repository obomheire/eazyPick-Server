import express from "express";
const router = express.Router();
import { getCategories } from "../controllers/categoriesController";

// APP ROUTE
router.get("/", getCategories);

export default router;
