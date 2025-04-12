export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    image:string
    createdAt: string;
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
    status: "pending" | "delivered" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed";
    createdAt: string;
  }