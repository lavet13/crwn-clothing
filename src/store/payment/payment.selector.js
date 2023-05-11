import { createSelector } from 'reselect';

export const selectPaymentReducer = state => state.payment;

export const selectPaymentRequest = createSelector(
  [selectPaymentReducer],
  payment => payment.paymentRequest
);

export const selectPaymentIsLoading = createSelector(
  [selectPaymentReducer],
  payment => payment.isLoading
);
