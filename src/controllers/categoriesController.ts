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
  res.status(200).send(categoriesList);
};

export const getCategory = async (req: Request, res: Response) => {
  const category = await Categories.findById(req.params.id);

  if (!category) {
    res.status(500).json({ Message: "Category with the given id not found!" });
  }
  res.status(200).send(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, icon, color } = req.body;

  let category = new Categories({
    name,
    icon,
    color,
  });

  category = await category.save();

  if (!category) {
    return res.status(404).send("The catigory cannot be created!");
  }

  res.send(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name, icon, color } = req.body;

  let newCategory ={
    name,
    icon,
    color,
  };

  let category = await Categories.findByIdAndUpdate(
    req.params.id,
    newCategory,
    { new: true }
  );

  if (!category) {
    return res.status(400).send("The catigory cannot be updated!");
  }

  res.send(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  Categories.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "The category was deleted successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "The category was not deleted",
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
