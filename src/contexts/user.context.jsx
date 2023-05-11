import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const USER_INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type of ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(
    userReducer,
    USER_INITIAL_STATE
  );

  const setCurrentUser = currentUser =>
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, currentUser));

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
