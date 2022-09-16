import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { Users } from "../models/usersModel";

export const getUsers = async (req: Request, res: Response) => {
  const  usersList = await Users.find();

  if (!usersList) {
    res.status(500).json({ success: false });
  }
  res.send(usersList);
};

export const createUser = async (req: Request, res: Response) => {

  const { name, email, passwordHash, phone, isAdmin, street, apartment, zip, city, country } = req.body;
 
  let user = new Users({
    name,
    email,
    passwordHash,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country
  });

  user = await user.save();

  if (!user) {
    return res.status(500).send({ Message: "The user cannot be created!" });
  }

  res.send(user);
};
