import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [], // Ensure the initial state is an array
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload); // Add the book to the wishlist
    },
    removeFromWishlist: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id); // Remove the book by ID
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
