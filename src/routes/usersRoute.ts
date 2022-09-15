import express from "express";
const router = express.Router();
import { getUsers } from "../controllers/usersController";

// APP ROUTE
router.get("/", getUsers);

export default router;
