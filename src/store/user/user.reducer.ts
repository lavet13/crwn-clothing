import { AnyAction } from 'redux';

import {
  checkUserSession,
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  signUpFailed,
  signUpStart,
} from './user.action';

import { UserData } from '../../utils/firebase/fireabase.types';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = USER_INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (
    checkUserSession.match(action) ||
    googleSignInStart.match(action) ||
    emailSignInStart.match(action) ||
    signUpStart.match(action) ||
    signOutStart.match(action)
  )
    return { ...state, isLoading: true };

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null, isLoading: false };
  }

  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload, isLoading: false };
  }

  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
