import { useState, createContext } from 'react';
import SHOP_DATA from '../shop-data.json';

export const ProductsContext = createContext({
  products: null,
  setProducts: () => null,
});

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = {
    products,
    setProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
