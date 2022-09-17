import mongoose, { Schema, model, Document, Types } from "mongoose";

const ordersSchema = new mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItems",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

ordersSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ordersSchema.set("toJSON", {
  virtuals: true,
});

export const Orders = model("Orders", ordersSchema);


/*
  Order Example:
  
  {
  "orderItems": [
 {
    "quantity": 3,
    "product": "5f9d1b0b0b5b9c0b8c8b8b8b"
      },
      {
    "quantity": 2,
    "product": "5f9d1b0b0b5b9c0b8c8b8b4a"
},
  ],
    "shippingAddress1": "1234 Main St",
    "shippingAddress2": "Apt 1",
    "city": "Seattle",
    "zip": "98101",
    "country": "USA",
    "phone": "123-456-7890",
    "status": "Pending",
    "totalPrice": 0,
    "user": "5f9d1b0b0b5b9c0b8c8b8b8b",
 }

 */
