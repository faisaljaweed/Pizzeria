import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type Order = {
  id: string;
  item: CartItem[];
  total: number;
  creditCartNum: string;
  state: "ready" | "pending";
};

interface OrderState {
  items: Order[];
}

const initialState: OrderState = {
  items: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Order>) => {
      const maskedCCRegex = /\d(?=(?:\D*\d){4})/g;
      const maskedCCNumber = action.payload.creditCartNum.replace(
        maskedCCRegex,
        "*"
      );
      const newOrder: Order = {
        ...action.payload,
        creditCartNum: maskedCCNumber,
      };
      state.items.push(newOrder);
    },
    removeOrder: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { createOrder, removeOrder } = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default persistReducer(
  {
    key: "order",
    storage,
  },
  orderReducer
);
