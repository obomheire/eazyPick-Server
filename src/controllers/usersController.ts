import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { Users } from "../models/usersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req: Request, res: Response) => {
  const usersList = await Users.find().select("-passwordHash");

  if (!usersList) {
    return res.status(500).json({ success: false });
  }
  res.status(200).send(usersList);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await Users.findById(req.params.id).select("-passwordHash");

  if (!user) {
    return res.status(500).json({
      success: false,
      Message: "User with the given ID was not found!",
    });
  }
  res.status(200).send(user);
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  const secret = process.env.secret;

  if (!user) {
    return res.status(400).json({ success: false, Message: "User not found!" });
  }

  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      <string>secret,
      { expiresIn: "1d" }
    );
    res.status(200).send({ success: true, user: user.email, token });
  } else {
    res.status(400).json({ success: false, Message: "Invalid credentials!" });
  }
};

export const userRegister = async (req: Request, res: Response) => {
  const {
    name,
    email,
    passwordHash,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  } = req.body;

  let user = new Users({
    name,
    email,
    passwordHash: bcrypt.hashSync(passwordHash, 10),
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  });

  user = await user.save();

  if (!user) {
    return res.status(400).send({ Message: "The user cannot be created!" });
  }

  res.status(200).send(user);
};

export const getUserCount = async (req: Request, res: Response) => {
  const userCount = await Users.countDocuments();

  if (!userCount) {
    return res.status(500).json({ success: false });
  }
  res.send({ userCount });
};

export const deleteUser = async (req: Request, res: Response) => {
  Users.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "The user was deleted successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "The user was not deleted",
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
      });
    });
};

