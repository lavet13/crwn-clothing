import { call, all, put, takeLatest } from 'redux-saga/effects';

import { PAYMENT_ACTION_TYPES } from './payment.types';
import { paymentRequestSuccess, paymentRequestFailed } from './payment.action';

export function* isActivePayment({ payload: { stripe, amount } }) {
  try {
    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Pay for Goods',
        amount: amount * 100,
      },
      requestPayerEmail: true,
      requestPayerName: true,
    });

    const result = yield call(pr.canMakePayment);

    console.log(result);

    if (result) {
      yield put(paymentRequestSuccess(pr));
    }
  } catch (error) {
    yield put(paymentRequestFailed(error));
  }
}

export function* onCheckPaymentRequest() {
  yield takeLatest(PAYMENT_ACTION_TYPES.CHECK_PAYMENT_REQUEST, isActivePayment);
}

export function* paymentSagas() {
  yield all([call(onCheckPaymentRequest)]);
}
