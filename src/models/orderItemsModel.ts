import { Schema, model } from "mongoose";
import { OrderItem } from "../utils/interface";

const orderItemsSchema = new Schema<OrderItem>({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
});

orderItemsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderItemsSchema.set("toJSON", {
  virtuals: true,
});


export const OrderItems = model<OrderItem>("OrderItems", orderItemsSchema);
