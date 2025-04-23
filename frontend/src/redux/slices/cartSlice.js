import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [], // Ensure the initial state is an array
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload); // Add the book to the cart
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id); // Remove the book by ID
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
