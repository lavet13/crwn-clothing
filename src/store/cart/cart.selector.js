import { createSelector } from 'reselect';

// a lot of a logic is being extrapolated into selectors and using reselect
// we can memoize them so that they are just as efficient as if we were to store
// them using either useReducer or useState inside of a context component(provider)
const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  cart => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  cart => cart.isCartOpen
);

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (total, cartItem) => total + +cartItem.quantity * +cartItem.price,
    0
  )
);

export const selectCartCount = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((total, cartItem) => total + +cartItem.quantity, 0)
);
