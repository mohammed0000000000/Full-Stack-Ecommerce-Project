import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { IProductItem } from '../../interfaces';
import { addItemToShoppingCart, clearShoppingCartItems, decreaseQuantityItemFromShoppingCart, removeItemFromShoppingCart } from '../../utils';
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
    },
    removeFromCart(state, action: PayloadAction<IProductItem>) {
      state.products = removeItemFromShoppingCart(action.payload, state.products);
      state.count = state.products.length
    },
    decreaseQuantity(state, action: PayloadAction<IProductItem>) {
      state.products = decreaseQuantityItemFromShoppingCart(action.payload, state.products);
      state.count = state.products.length
    },
    clearCart(state) {
      state.products = clearShoppingCartItems(state.products);
      state.count = 0;
    }
  }
})
export const selectCart = (state: RootState) => state.cart.count;
export const selectCartItems = (state: RootState) => state.cart.products;
export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;