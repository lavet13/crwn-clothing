import { CategoryItem } from '../categories/categories.types';

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  CLEAR_CART_ITEM = 'CLEAR_CART_ITEM',
  UNDO_CLEAR = 'UNDO_CLEAR',
  SHOW_UNDO = 'SHOW_UNDO',
  HIDE_UNDO = 'HIDE_UNDO',
  UNDO = 'UNDO',
}

export type CartItem = CategoryItem & {
  quantity: number;
};
