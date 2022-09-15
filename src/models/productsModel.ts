import mongoose, { Schema, model, Document, Types } from "mongoose";

const productsSchema = new mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: String,
        require: true
    }
})

export const Products = model("Products", productsSchema);