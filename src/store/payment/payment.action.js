import { PAYMENT_ACTION_TYPES } from './payment.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const checkPaymentRequest = (stripe, amount) =>
  createAction(PAYMENT_ACTION_TYPES.CHECK_PAYMENT_REQUEST, { stripe, amount });

export const paymentRequestSuccess = paymentRequest =>
  createAction(PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_SUCCESS, paymentRequest);

export const paymentRequestFailed = error =>
  createAction(PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_FAILED, error);
