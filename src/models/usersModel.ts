import mongoose, { Schema, model, Document, Types } from "mongoose";

const usersSchema = new mongoose.Schema({
  
});

export const Users = model("Users", usersSchema);
