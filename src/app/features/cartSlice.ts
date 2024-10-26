import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { IProductItem } from '../../interfaces';
import { addItemToShoppingCart } from '../../utils';
export interface IInitialState {
  products: Array<IProductItem>,
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
    addToCart(state, action: PayloadAction<IProductItem>) {
      state.products = addItemToShoppingCart(action.payload, state.products);
      state.count = state.products.length
    }
  }
})
export const selectCart = (state: RootState) => state.cart.count;
export const selectCartItems = (state: RootState) => state.cart.products;
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;