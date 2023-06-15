import { AnyAction } from 'redux';
import { PaymentIntent } from '@stripe/stripe-js';
import { PAYMENT_ACTION_TYPES } from './payment.types';
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
  error?: Error | string | null;
};

export const PAYMENT_INITIAL_STATE: PaymentState = {
  paymentRequest: null,
  status: null,
  isLoading: false,
  error: null,
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

  if (cardPaymentFailed.match(action) || paymentRequestFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
  // const { type, payload } = action;

  // switch (type) {
  //   case PAYMENT_ACTION_TYPES.CARD_PAYMENT_START:
  //     return { ...state, isLoading: true };
  //   case PAYMENT_ACTION_TYPES.CARD_PAYMENT_SUCCESS:
  //     return { ...state, status: payload, isLoading: false, error: null };
  //   case PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_SUCCESS:
  //     return { ...state, paymentRequest: payload, error: null };
  //   case PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_FAILED:
  //   case PAYMENT_ACTION_TYPES.CARD_PAYMENT_FAILED:
  //     return { ...state, error: payload, isLoading: false };
  //   default:
  //     return state;
  // }
};
