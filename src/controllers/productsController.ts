import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { Products } from "../models/productsModel";
import { Categories } from "../models/categoriesModel";
import mongoose from "mongoose";

export const getProducts = async (req: Request, res: Response) => {
  const productLists = await Products.find().select("name image -_id");

  if (!productLists) {
    res.status(500).json({ success: false });
  }
  res.send(productLists);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await Products.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;

  try {
    const findCategory = await Categories.findById(category);
    if (!findCategory) {
      return res.status(400).send({ Message: "Invalid category" });
    }

    let product = new Products({
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    });

    product = await product.save();

    if (!product) {
      return res
        .status(500)
        .send({ Message: "The product cannot be created!" });
    }

    res.send(product);
  } catch (error: any) {
    res.send({ Message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send({ Message: "Invalid product id" });
  }

  try {
    const findCategory = await Categories.findById(category);
    if (!findCategory) {
      return res.status(400).send({ Message: "Invalid category" });
    }

    let newProduct = {
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    };

    let product = await Products.findByIdAndUpdate(req.params.id, newProduct, {
      new: true,
    }).populate("category");

    if (!product) {
      return res
        .status(500)
        .send({ Message: "The product cannot be updated!" });
    }

    res.send(product);
  } catch (error: any) {
    res.send({ Message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  Products.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "The product was deleted successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "The product was not deleted",
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

export const getProductCount = async (req: Request, res: Response) => {
  const productCount = await Products.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount,
  });
};  
