import { createContext, useEffect, useReducer } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  toggleIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  clearItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_TIME_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
  TOGGLE_IS_CART_OPEN: 'TOGGLE_IS_CART_OPEN',
};

const CartReducer = (state, action) => {
  const { type, payload } = action;
  const { cartItems, isCartOpen } = state;

  switch (type) {
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART: {
      const existingCartItem = cartItems.find(
        cartItem => cartItem.id === payload.id
      );

      if (existingCartItem) {
        return {
          ...state,
          cartItems: cartItems.map(cartItem =>
            cartItem.id === payload.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      return {
        ...state,
        cartItems: [...cartItems, { ...payload, quantity: 1 }],
      };
    }

    case CART_ACTION_TYPES.REMOVE_TIME_FROM_CART: {
      const existingCartItem = cartItems.find(
        cartItem => cartItem.id === payload.id
      );

      if (existingCartItem.quantity === 1) {
        return {
          ...state,
          cartItems: cartItems.filter(cartItem => cartItem.id !== payload.id),
        };
      }

      return {
        ...state,
        cartItems: cartItems.map(cartItem =>
          cartItem.id === payload.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ),
      };
    }

    case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: cartItems.filter(cartItem => cartItem.id !== payload.id),
      };

    case CART_ACTION_TYPES.SET_CART_COUNT:
      return { ...state, cartCount: payload };

    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return { ...state, cartTotal: payload };

    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return { ...state, isCartOpen: !isCartOpen };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
  const { cartItems, cartCount, cartTotal, isCartOpen } = state;

  const setCartCount = newCartCount =>
    dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT, payload: newCartCount });

  const setCartTotal = newCartTotal =>
    dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL, payload: newCartTotal });

  const toggleIsCartOpen = () =>
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN });

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + +cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + +cartItem.quantity * +cartItem.price,
      0
    );

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const clearItemFromCart = cartItemToClear =>
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART,
      payload: cartItemToClear,
    });

  const removeItemFromCart = cartItemToRemove =>
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_TIME_FROM_CART,
      payload: cartItemToRemove,
    });

  const addItemToCart = productToAdd =>
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: productToAdd,
    });

  const value = {
    isCartOpen,
    toggleIsCartOpen,
    cartItems,
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
