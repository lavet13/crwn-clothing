import { PAYMENT_ACTION_TYPES } from './payment.types';

export const PAYMENT_INITIAL_STATE = {
  paymentRequest: null,
  status: null,
  isLoading: false,
  error: null,
};

export const paymentReducer = (state = PAYMENT_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_ACTION_TYPES.CARD_PAYMENT_START:
      return { ...state, isLoading: true };
    case PAYMENT_ACTION_TYPES.CARD_PAYMENT_SUCCESS:
      return { ...state, status: payload, isLoading: false, error: null };
    case PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_SUCCESS:
      return { ...state, paymentRequest: payload, error: null };
    case PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_FAILED:
    case PAYMENT_ACTION_TYPES.CARD_PAYMENT_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
