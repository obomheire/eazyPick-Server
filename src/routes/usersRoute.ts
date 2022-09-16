import express from "express";
const router = express.Router();
import {
  getUsers,
  createUser,
  getUser,
  userLogin,
} from "../controllers/usersController";

// Users Routes
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/login", userLogin);

export default router;
