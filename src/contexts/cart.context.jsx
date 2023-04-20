import { createContext, useState } from 'react';

export const CartContext = createContext({
  isOpened: false,
  setIsOpened: () => null,
});

export const CartProvider = ({ children }) => {
  const [isOpened, setIsOpened] = useState(false);

  const value = {
    isOpened,
    setIsOpened,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
