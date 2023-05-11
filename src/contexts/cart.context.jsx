import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

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
};

export const CartContext = createContext({
  cartItems: [],
  cartTotal: 0,
  cartCount: 0,
  cartIsOpen: false,
  setCartIsOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
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

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return { ...state, cartIsOpen: payload };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartIsOpen, cartTotal, cartCount }, dispatch] =
    useReducer(cartReducer, CART_INITIAL_STATE);

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

  const value = {
    cartItems,
    cartTotal,
    cartCount,
    cartIsOpen,
    setCartIsOpen,
    addItemToCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
