import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { Orders } from "../models/ordersModel";
import { OrderItems } from "../models/orderItemsModel";
import { OrderItem, Product } from "../utils/interface";
import { Products } from "../models/productsModel";

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
    return res.status(500).json({ success: false });
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

  const totalPrices = await Promise.all(
    orderItemsIds.map(async (orderItemId: string) => {
      const orderItem = await OrderItems.findById(orderItemId).populate( 
        "product",
        "price"
      );

      // console.log(orderItem?.product?.price); //This is not working
      
      const product: any = await Products.findById(orderItem?.product?._id);
      let totalPrice = product?.price * orderItem?.quantity!;
      return totalPrice;
    }
  ));

  let sumTotalPrice = totalPrices.reduce((a: number, b: number) => a + b, 0);

  let order = new Orders({
    orderItems: orderItemsIds,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice: sumTotalPrice,
    user,
  });

  order = await order.save();

  if (!order) return res.status(400).send("The order cannot be created!");

  res.status(201).send(order);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;

  const order = await Orders.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!order)
    return res
      .status(400)
      .send({ Success: false, Message: "Order not found!" });

  res.send(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  Orders.findByIdAndRemove(req.params.id)
    .then((order) => {
      if (order) {
        order.orderItems.map(async (orderItem) => {
          await OrderItems.findByIdAndRemove(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: "Order deleted successfully!" });
      } else {
        return res.status(404).json({
          success: false,
          message: "The order was not deleted",
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

export const getTotalSales = async (req: Request, res: Response) => {
  const totalSales = await Orders.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated");
  }
  
  // console.log(totalSales);
  res.send({Success: true, totalSales: totalSales.pop()?.totalSales });

};

export const getOrderCount = async (req: Request, res: Response) => {
  const orderCount = await Orders.countDocuments();

  if (!orderCount) {
    return res.status(500).json({ success: false });
  }
  res.send({ orderCount });
};

export const getUserOrders = async (req: Request, res: Response) => { 

  const userOrderList = await Orders.find({ user: req.params.userId })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 });

  if (!userOrderList) {
    return res.status(500).json({ success: false, message: "Order not found!" });
  }
  
  res.send(userOrderList);
}

