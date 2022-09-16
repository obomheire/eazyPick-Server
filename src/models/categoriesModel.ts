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

// categoriesSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// categoriesSchema.set("toJSON", {
//   virtuals: true,
// });

export const Categories = model("Categories", categoriesSchema);
