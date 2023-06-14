import { AnyAction } from 'redux';
import { take, put, race, delay, takeEvery } from 'typed-redux-saga/macro';
import { CART_ACTION_TYPES } from './cart.types';
import {
  UndoClearFromCart,
  clearItemFromCart,
  hideUndo,
  showUndo,
} from './cart.action';

export function* onUndo(action: UndoClearFromCart) {
  const { id: undoId, cartItemToClear } = action.payload;

  yield* put(showUndo(undoId));

  const { archive } = yield* race({
    undo: take(
      (action: AnyAction): boolean =>
        action.type === CART_ACTION_TYPES.UNDO &&
        action.payload.undoId === undoId
    ),
    archive: delay(5000),
  });

  yield* put(hideUndo(undoId));

  if (archive) {
    yield* put(clearItemFromCart(cartItemToClear));
  }
}

export function* cartSagas() {
  yield* takeEvery(CART_ACTION_TYPES.UNDO_CLEAR, onUndo);
}
