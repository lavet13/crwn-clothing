import { CartItem } from './cart.types';
import { AnyAction } from 'redux';

import {
  clearItemFromCart,
  hideUndo,
  setCartItems,
  setIsCartOpen,
  showUndo,
} from './cart.action';

export type CartState = {
  readonly cartItems: CartItem[];
  readonly isCartOpen: boolean;
  readonly undoId: string[];
};

export const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
  undoId: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }

  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }

  if (clearItemFromCart.match(action)) {
    return {
      ...state,
      cartItems: state.cartItems.filter(
        cartItem => cartItem.id !== action.payload.id
      ),
    };
  }

  if (showUndo.match(action)) {
    return {
      ...state,
      undoId: [...state.undoId, action.payload.id],
    };
  }

  if (hideUndo.match(action)) {
    return {
      ...state,
      undoId: state.undoId.filter(id => id !== action.payload.id),
    };
  }

  return state;
};
