import { takeLatest, call, all, put } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInFailed, signInSuccess } from './user.action';
import {
  createUserDocumentFromAuth,
  getCurrentUser,
} from '../../utils/firebase/firebase.utils';

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;

    yield call(createUserDocumentFromAuth, userAuth);
    yield put(signInSuccess(userAuth));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([]);
}
