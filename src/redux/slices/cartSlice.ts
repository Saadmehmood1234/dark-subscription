import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addItemToCart,
  deleteCartItem,
  getCartByCustomer,
} from "@/app/actions/cart.actions";
import { SanitizedCart } from "@/utils/sanitize";
interface Product {
  _id: string;
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
  createdAt?: string;
  updatedAt?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  subscriptionPlan?: "monthly" | "yearly";
}

interface CartState {
  cart: {
    items: CartItem[];
    totalPrice: number;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cart: { items: [], totalPrice: 0 },
  status: "idle",
  error: null,
};

const sanitizeProduct = (product: any): Product => ({
  _id: product._id,
  title: product.title,
  description: product.description,
  price: product.price,
  discount: product.discount,
  originalPrice: product.originalPrice,
  logoImage: product.logoImage,
  category: product.category,
  stock: product.stock,
  features: product.features,
  images: product.images,
  createdAt: product.createdAt
    ? new Date(product.createdAt).toISOString()
    : undefined,
  updatedAt: product.updatedAt
    ? new Date(product.updatedAt).toISOString()
    : undefined,
});

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartByCustomer();

      if (!response.success) {
        return rejectWithValue(response.message || "Failed to fetch cart");
      }

      if (!response.cart) {
        return {
          items: [],
          totalPrice: 0,
        };
      }
      if (Array.isArray(response.cart)) {
        console.warn("Unexpected array response for cart");
        return {
          items: [],
          totalPrice: 0,
        };
      }
      return {
        items: response.cart.items.map((item: any) => ({
          product: sanitizeProduct(item.product),
          quantity: item.quantity,
          price: item.price,
          subscriptionPlan: item.subscriptionPlan,
        })),
        totalPrice: response.cart.totalPrice || 0,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    {
      product,
      quantity,
      price,
      subscriptionPlan,
      operation,
    }: {
      product: string;
      quantity: number;
      price: number;
      subscriptionPlan?: "monthly" | "yearly";
      operation?: "increment" | "decrement" | "set";
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await addItemToCart({
        product,
        quantity: operation ? 1 : quantity,
        price,
        subscriptionPlan,
        operation,
      });

      if (!response.success) {
        return rejectWithValue(response.message);
      }
      const cartData = response.data as SanitizedCart | undefined;

      return {
        items:
          cartData?.items?.map((item: any) => ({
            product: sanitizeProduct(item.product),
            quantity: item.quantity,
            price: item.price,
            subscriptionPlan: item.subscriptionPlan,
          })) || [],
        totalPrice: cartData?.totalPrice || 0,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to add to cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await deleteCartItem(productId);

      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return {
        items:
          response.cart?.items?.map((item: any) => ({
            product: sanitizeProduct(item.product),
            quantity: item.quantity,
            price: item.price,
            subscriptionPlan: item.subscriptionPlan,
          })) || [],
        totalPrice: response.cart?.totalPrice || 0,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to remove from cart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartQuantityLocally: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const item = state.cart.items.find((i) => i.product._id === productId);
      if (item) {
        const unitPrice = item.price / item.quantity;
        item.quantity = newQuantity;
        item.price = unitPrice * newQuantity;
        state.cart.totalPrice = state.cart.items.reduce(
          (acc, item) => acc + item.price,
          0
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default cartSlice.reducer;
export const { updateCartQuantityLocally } = cartSlice.actions;