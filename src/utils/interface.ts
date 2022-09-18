import { Types } from "mongoose";

export interface Category {
  name: string;
  icon: string;
  color: string;
}

export interface OrderItem {
  quantity: number;
  product: Types.ObjectId;
}

export interface Order {
  orderItems: OrderItem[];
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: string;
  totalPrice: number;
  user: Types.ObjectId;
  dateOrdered: Date;
}

export interface Product {
  name: string;
  description: string;
  richDescription: string;
  image: string;
  images: string[];
  brand: string;
  price: number;
  category: Types.ObjectId;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: Date;
}

export interface User { 
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  isAdmin: boolean;
  street: string;
  apartment: string;
  zip: string;
  city: string;
  country: string;
}

