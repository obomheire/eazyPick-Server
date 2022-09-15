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
