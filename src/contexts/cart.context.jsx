import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';
import { produce } from 'immer';
import { useImmerReducer } from 'use-immer';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity > 1) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  cartItems: [],
  cartTotal: 0,
  cartCount: 0,
  cartIsOpen: false,
  setCartIsOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_IS_OPEN: 'SET_CART_IS_OPEN',
};

const CART_INITIAL_STATE = {
  cartItems: [],
  cartTotal: 0,
  cartCount: 0,
  cartIsOpen: false,
};

const cartReducer = (draft, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      draft.cartItems = payload.cartItems;
      draft.cartTotal = payload.cartTotal;
      draft.cartCount = payload.cartCount;
      return;
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      draft.cartIsOpen = payload;
      return;
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartIsOpen, cartTotal, cartCount }, dispatch] =
    useImmerReducer(cartReducer, CART_INITIAL_STATE);

  const updateCartItemsReducer = newCartItems => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + +cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + +cartItem.quantity * +cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const setCartIsOpen = boolean =>
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, boolean));

  const addItemToCart = productToAdd => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = cartItemToRemove => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);

    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = cartItemToClear => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);

    updateCartItemsReducer(newCartItems);
  };

  const value = {
    cartItems,
    cartTotal,
    cartCount,
    cartIsOpen,
    setCartIsOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
