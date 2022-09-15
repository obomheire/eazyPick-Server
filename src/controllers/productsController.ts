import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { Product } from "../models/productModel";

export const getProducts = async (req: Request, res: Response) => { 
    const productLists = await Product.find();
    
    if (!productLists) {
        res.status(500).json({ success: false });
    }
    res.send(productLists);
}



export const postProducts = async (req: Request, res: Response) => {
    const { name, image, countInStock } = req.body;
    const product = new Product({
        name,
        image,
        countInStock,
    });
    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct);
        })
        .catch((error) => {
            res.status(500).json({
                error,
                success: false,
            });
        });
};