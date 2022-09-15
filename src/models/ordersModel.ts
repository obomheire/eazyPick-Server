import mongoose, { Schema, model, Document, Types } from "mongoose";

const ordersSchema = new mongoose.Schema({

});

export const Orders = model("Orders", ordersSchema);
