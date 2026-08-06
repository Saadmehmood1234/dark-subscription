import { Types } from "mongoose";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  image?: string;
  provider: "credentials" | "google";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  originalPrice: number;
  logoImage: string;
  category: string;
  stock: number;
  features: string[];
  images: string[];
};
export interface Order {
  id: string;
  products: {
    product: {
      id: string;
      title: string;
      price: number;
      logoImage: string;
      category?: string;
    };
    quantity: number;
  }[];
  totalAmount: number;
  paymentMethod: string;
  status: "processing" | "delivered" | "cancelled";
  paymentStatus: "processing" | "verification_pending" | "paid" | "failed";
  createdAt: string;
}

export interface Category {
  id: string;
  title: string;
  logoImage: string;
  status: "active" | "inactive";
  slug: string;
};
