import { all, call } from 'typed-redux-saga/macro';

import { categoriesSaga } from './categories/categories.saga';
import { userSagas } from './user/user.saga';
import { paymentSagas } from './payment/payment.saga';
import { cartSagas } from './cart/cart.saga';

export function* rootSaga() {
  yield* all([
    call(categoriesSaga),
    call(userSagas),
    call(paymentSagas),
    call(cartSagas),
  ]);
}
