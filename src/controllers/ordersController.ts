import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { Orders } from "../models/ordersModel";
import { OrderItems } from "../models/orderItemsModel";
import { OrderItem } from "../utils/interface";

export const getOrders = async (req: Request, res: Response) => {
  const ordersList = await Orders.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 }); //Sort newest to oldest

  if (!ordersList) {
    res.status(500).json({ success: false });
  }
  res.send(ordersList);
};

export const getOrder = async (req: Request, res: Response) => {
  const order = await Orders.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    }); //Populate product which is an array of orderItems and populate category in product as well

  if (!order) {
    res.status(500).json({ success: false });
  }
  res.send(order);
};

export const createOrder = async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
  } = req.body;

  const orderItemsIds = await Promise.all(
    orderItems.map(async (orderItem: OrderItem) => {
      const { quantity, product } = orderItem;
      let newOrderItem = new OrderItems({
        quantity,
        product,
      });

      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );

  // console.log(orderItemsIds);

  let order = new Orders({
    orderItems: orderItemsIds,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
  });

  order = await order.save();

  if (!order) return res.status(400).send("The order cannot be created!");

  res.status(201).send(order);
};
