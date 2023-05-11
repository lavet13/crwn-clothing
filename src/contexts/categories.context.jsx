import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    (async () => {
      const categoriesArray = await getCategoriesAndDocuments();

      const categoriesMap = categoriesArray.reduce((acc, category) => {
        const { title, items } = category;

        acc[title.toLowerCase()] = items;
        return acc;
      }, {});

      setCategoriesMap(categoriesMap);
    })();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
