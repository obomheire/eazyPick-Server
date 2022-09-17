import express from "express";
const router = express.Router();
import {
  getUsers,
  getUser,
  userLogin,
  userRegister,
  getUserCount,
  deleteUser,
} from "../controllers/usersController";

// Users Routes
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/get/count", getUserCount);

export default router;
