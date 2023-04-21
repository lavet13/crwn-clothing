import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    // my take
    // existingCartItem.quantity++;
    // return [...cartItems];

    // Yihua's take
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const deleteCartItem = (cartItems, deleteId) =>
  cartItems.filter(cartItem => cartItem.id !== deleteId);

const setNewQuantity = (cartItems, productId, quantity) => {
  return cartItems.map(cartItem =>
    cartItem.id === productId ? { ...cartItem, quantity } : cartItem
  );

  // my take
  // const itemWithNewQuantity = cartItems.find(cartItem => cartItem.id === productId);
  // itemWithNewQuantity.quantity = quantity;
  // return [...cartItems];
};

export const CartContext = createContext({
  isCartOpen: false,
  toggleIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  deleteItemFromCart: () => {},
  incrementQuantityOfCartItem: () => {},
  decrementQuantityOfCartItem: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + +cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  const deleteItemFromCart = deleteId => {
    setCartItems(deleteCartItem(cartItems, deleteId));
  };

  const incrementQuantityOfCartItem = (productId, quantity) => {
    setCartItems(setNewQuantity(cartItems, productId, quantity + 1));
  };

  const decrementQuantityOfCartItem = (productId, quantity) => {
    if (quantity > 1)
      setCartItems(setNewQuantity(cartItems, productId, quantity - 1));
  };

  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    toggleIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    deleteItemFromCart,
    incrementQuantityOfCartItem,
    decrementQuantityOfCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
