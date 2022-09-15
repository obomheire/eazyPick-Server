import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { Orders } from "../models/ordersModel";

export const getOrders = async (req: Request, res: Response) => {
  const ordersList = await Orders.find();

  if (!ordersList) {
    res.status(500).json({ success: false });
  }
  res.send(ordersList);
};
