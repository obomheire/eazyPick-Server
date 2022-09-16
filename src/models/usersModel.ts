import mongoose, { Schema, model, Document, Types } from "mongoose";

const usersSchema = new mongoose.Schema({
  
});

// usersSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// usersSchema.set("toJSON", {
//   virtuals: true, 
// });

export const Users = model("Users", usersSchema);
