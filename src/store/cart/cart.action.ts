import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.utils';
import { CategoryItem } from '../categories/categories.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type UndoClearFromCart = ActionWithPayload<
  CART_ACTION_TYPES.UNDO_CLEAR,
  { id: string; cartItemToClear: CartItem }
>;

export type ShowUndo = ActionWithPayload<
  CART_ACTION_TYPES.SHOW_UNDO,
  { id: string }
>;

export type HideUndo = ActionWithPayload<
  CART_ACTION_TYPES.HIDE_UNDO,
  { id: string }
>;

export type UndoClearing = ActionWithPayload<
  CART_ACTION_TYPES.UNDO,
  { undoId: string }
>;

export type ClearItemFromCart = ActionWithPayload<
  CART_ACTION_TYPES.CLEAR_CART_ITEM,
  CartItem
>;

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const clearItemFromCart = withMatcher(
  (cartItemToClear: CartItem): ClearItemFromCart =>
    createAction(CART_ACTION_TYPES.CLEAR_CART_ITEM, cartItemToClear)
);

export const undoClearFromCart = withMatcher(
  (id: string, cartItemToClear: CartItem): UndoClearFromCart =>
    createAction(CART_ACTION_TYPES.UNDO_CLEAR, {
      id,
      cartItemToClear,
    })
);

export const showUndo = withMatcher(
  (id: string): ShowUndo => createAction(CART_ACTION_TYPES.SHOW_UNDO, { id })
);

export const hideUndo = withMatcher(
  (id: string): HideUndo => createAction(CART_ACTION_TYPES.HIDE_UNDO, { id })
);

export const undoClearing = withMatcher(
  (undoId: string): UndoClearing =>
    createAction(CART_ACTION_TYPES.UNDO, { undoId })
);

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};
