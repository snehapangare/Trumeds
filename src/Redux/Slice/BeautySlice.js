import { createSlice } from "@reduxjs/toolkit";
import { GetBeauty } from "./Action";

/* ---------------- LOAD CART FROM LOCAL STORAGE ---------------- */

const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("beautyCart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  Beauty: [],
  loading: false,
  error: null,
  cart: loadCartFromStorage()
};

/* ---------------- BEAUTY SLICE ---------------- */

const BeautySlice = createSlice({
  name: "Beauty",
  initialState,

  reducers: {

    /* ADD PRODUCT TO CART */
    AddBeautyCart: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload.id);

      if (item) {
        item.qty += 1;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }

      localStorage.setItem("beautyCart", JSON.stringify(state.cart));
    },

    /* REMOVE PRODUCT FROM CART */
    RemoveBeautyCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);

      localStorage.setItem("beautyCart", JSON.stringify(state.cart));
    },

    /* INCREASE QUANTITY */
    IncreaseBeautyQty: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);

      if (item) {
        item.qty += 1;
      }

      localStorage.setItem("beautyCart", JSON.stringify(state.cart));
    },

    /* DECREASE QUANTITY */
    DecreaseBeautyQty: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);

      if (!item) return;

      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        state.cart = state.cart.filter((i) => i.id !== action.payload);
      }

      localStorage.setItem("beautyCart", JSON.stringify(state.cart));
    }

  },

  /* ---------------- API FETCH ---------------- */

  extraReducers: (builder) => {
    builder

      .addCase(GetBeauty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetBeauty.fulfilled, (state, action) => {
        state.loading = false;
        state.Beauty = action.payload;
      })

      .addCase(GetBeauty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to fetch beauty products";
      });

  }
});

/* ---------------- EXPORT ACTIONS ---------------- */

export const {
  AddBeautyCart,
  RemoveBeautyCart,
  IncreaseBeautyQty,
  DecreaseBeautyQty
} = BeautySlice.actions;

/* ---------------- EXPORT REDUCER ---------------- */

export default BeautySlice.reducer;