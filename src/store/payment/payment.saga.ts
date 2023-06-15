import { call, all, put, takeLatest } from 'typed-redux-saga/macro';

import { PAYMENT_ACTION_TYPES } from './payment.types';
import {
  paymentRequestSuccess,
  paymentRequestFailed,
  cardPaymentSuccess,
  cardPaymentFailed,
  CheckPaymentRequest,
  CardPaymentStart,
} from './payment.action';

export function* isActivePayment({
  payload: { stripe, amount },
}: CheckPaymentRequest) {
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

    const result = yield* call(pr.canMakePayment);

    yield* call(console.log, result);

    if (result) {
      yield* put(paymentRequestSuccess(pr));
    }
  } catch (error: any) {
    yield* put(paymentRequestFailed(error));
  }
}

export function* payWithCard({
  payload: { stripe, elements, CardElement, amount, address },
}: CardPaymentStart) {
  try {
    // @INCOMPLETE: try to use axios instead
    // https://stackoverflow.com/questions/40007935/how-to-handle-errors-in-fetch-responses-with-redux-saga
    // https://stripe.com/docs/stripe-js/elements/payment-request-button?client=react#react-mount-element
    const response = yield* call(
      fetch,
      '/.netlify/functions/create-payment-intent',
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount * 100 }),
      }
    );
    console.log(response);

    if (!(response.status >= 200 && response.status < 300) || !response.ok)
      throw response;

    const responseData = yield* call([response, response.json]);

    const clientSecret = responseData.paymentIntent.client_secret;

    const paymentResult = yield* call(stripe.confirmCardPayment, clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          ...address,
        },
      },
    });

    if (paymentResult.error) {
      const { message } = paymentResult.error;

      yield put(cardPaymentFailed(message));
    } else {
      yield put(cardPaymentSuccess(paymentResult.paymentIntent.status));
    }
  } catch (error) {
    yield put(cardPaymentFailed(error));
  }
}

export function* onCheckPaymentRequest() {
  yield takeLatest(PAYMENT_ACTION_TYPES.CHECK_PAYMENT_REQUEST, isActivePayment);
}

export function* onCardPaymentStart() {
  yield takeLatest(PAYMENT_ACTION_TYPES.CARD_PAYMENT_START, payWithCard);
}

export function* paymentSagas() {
  yield all([call(onCheckPaymentRequest), call(onCardPaymentStart)]);
}
