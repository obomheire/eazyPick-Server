import mongoose, { Schema, model, Document, Types } from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: String,
        require: true
    }
})

export const Product = model("Product", productSchema);