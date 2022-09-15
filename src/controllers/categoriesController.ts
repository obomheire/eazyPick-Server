import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { Categories } from "../models/categoriesModel";

export const getCategories = async (req: Request, res: Response) => {
  const categoriesList = await Categories.find();

  if (!categoriesList) {
    res.status(500).json({ success: false });
  }
  res.send(categoriesList);
};
