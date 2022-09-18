import mongoose from "mongoose";

export interface OrderItem {
  quantity: number;
  product: mongoose.Types.ObjectId;
}
export interface Product {
  name: string;
  description: string;
  richDescription: string;
  image: string;
  images: string[];
  brand: string;
  price: number;
  category: mongoose.Types.ObjectId;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: Date;
}

