import { Schema, model } from "mongoose";
import { Category } from "../utils/interface";

const categoriesSchema = new Schema<Category>({
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

categoriesSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categoriesSchema.set("toJSON", {
  virtuals: true,
});

export const Categories = model<Category>("Categories", categoriesSchema);
