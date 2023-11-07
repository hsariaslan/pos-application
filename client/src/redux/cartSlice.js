import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    subTotal: 0,
    tax: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const foundProduct = state.cartItems.find(
        (cartItem) => cartItem._id === action.payload._id
      );

      if (foundProduct) {
        foundProduct.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }

      state.subTotal += action.payload.price;
      state.tax = (state.subTotal * process.env.REACT_APP_TAX / 100).toFixed(2);
      state.total = (state.subTotal + Number(state.tax)).toFixed(2);
    },
    removeProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      state.subTotal -= action.payload.price * action.payload.quantity;
      state.tax = (state.subTotal * process.env.REACT_APP_TAX / 100).toFixed(2);
      state.total = (state.subTotal + Number(state.tax)).toFixed(2);
    },
    increaseQuantity: (state, action) => {
      const foundProduct = state.cartItems.find(
        (cartItem) => cartItem._id === action.payload._id
      );

      foundProduct.quantity += 1;

      state.subTotal += action.payload.price;
      state.tax = (state.subTotal * process.env.REACT_APP_TAX / 100).toFixed(2);
      state.total = (state.subTotal + Number(state.tax)).toFixed(2);
    },
    decreaseQuantity: (state, action) => {
      const foundProduct = state.cartItems.find(
        (cartItem) => cartItem._id === action.payload._id
      );

      foundProduct.quantity -= 1;

      if (foundProduct.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
      }

      state.subTotal -= action.payload.price;
      state.tax = (state.subTotal * process.env.REACT_APP_TAX / 100).toFixed(2);
      state.total = (state.subTotal + Number(state.tax)).toFixed(2);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subTotal = 0;
      state.tax = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;