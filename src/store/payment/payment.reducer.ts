import { AnyAction } from 'redux';
import { PaymentIntent, PaymentRequest } from '@stripe/stripe-js';
import {
  cardPaymentFailed,
  cardPaymentStart,
  cardPaymentSuccess,
  paymentRequestFailed,
} from './payment.action';

type PaymentState = {
  paymentRequest: PaymentRequest | null;
  status: PaymentIntent.Status | null;
  isLoading: boolean;
  error?: string | null;
  paymentRequestError: Error | null;
};

export const PAYMENT_INITIAL_STATE: PaymentState = {
  paymentRequest: null,
  status: null,
  isLoading: false,
  error: null,
  paymentRequestError: null,
};

export const paymentReducer = (
  state = PAYMENT_INITIAL_STATE,
  action: AnyAction
): PaymentState => {
  if (cardPaymentStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (cardPaymentSuccess.match(action)) {
    return { ...state, status: action.payload, isLoading: false, error: null };
  }

  if (cardPaymentFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  if (paymentRequestFailed.match(action)) {
    return { ...state, paymentRequestError: action.payload, isLoading: false };
  }

  return state;
};
