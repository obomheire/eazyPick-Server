import mongoose, { Schema, model, Document, Types } from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    }

});

orderItemsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderItemsSchema.set("toJSON", {
  virtuals: true,
});


export const OrderItems = model("OrderItems", orderItemsSchema);
