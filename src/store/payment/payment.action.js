import { PAYMENT_ACTION_TYPES } from './payment.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const checkPaymentRequest = (stripe, amount) =>
  createAction(PAYMENT_ACTION_TYPES.CHECK_PAYMENT_REQUEST, { stripe, amount });

export const paymentRequestSuccess = paymentRequest =>
  createAction(PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_SUCCESS, paymentRequest);

export const paymentRequestFailed = error =>
  createAction(PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_FAILED, error);

export const cardPaymentStart = (
  stripe,
  elements,
  CardElement,
  address,
  amount
) =>
  createAction(PAYMENT_ACTION_TYPES.CARD_PAYMENT_START, {
    stripe,
    elements,
    CardElement,
    address,
    amount,
  });

export const cardPaymentSuccess = status =>
  createAction(PAYMENT_ACTION_TYPES.CARD_PAYMENT_SUCCESS, status);

export const cardPaymentFailed = error =>
  createAction(PAYMENT_ACTION_TYPES.CARD_PAYMENT_FAILED, error);
