import { createContext, useState, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
}); // passing kind of default value, not necessary the initial value

// this provider is essentially allowing any of it's child components to access the values inside useState
export const UserProvider = ({ children }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
