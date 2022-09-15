import mongoose, { Schema, model, Document, Types } from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
  },
    icon: {
        type: String,
  },
  color: {
    type: String,
  },
});

export const Categories = model("Categories", categoriesSchema);
