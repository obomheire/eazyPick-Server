import mongoose, { Schema, model, Document, Types } from "mongoose";

const ordersSchema = new mongoose.Schema({

});

// ordersSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// ordersSchema.set("toJSON", {
//   virtuals: true,
// });


export const Orders = model("Orders", ordersSchema);
