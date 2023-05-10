import { PAYMENT_ACTION_TYPES } from './payment.types';

export const PAYMENT_INITIAL_STATE = {
  paymentRequest: null,
};

export const paymentReducer = (state = PAYMENT_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_SUCCESS:
      return { ...state, paymentRequest: payload };
    case PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
