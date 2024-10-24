import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export interface IInitialState {
  products: Array<number | string>,
  count: number;
}
const initialState: IInitialState = {
  products: [],
  count: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number | string>) {
      state.products = [...state.products, action.payload]
      state.count = state.count + 1
    }
  }
})
export const selectCart = (state: RootState) => state.cart.count;
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;