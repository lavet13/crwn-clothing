import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectPaymentReducer = (state: RootState) => state.payment;

export const selectPaymentRequest = createSelector(
  [selectPaymentReducer],
  payment => payment.paymentRequest
);

export const selectPaymentIsLoading = createSelector(
  [selectPaymentReducer],
  payment => payment.isLoading
);

export const selectPaymentRequestError = createSelector(
  [selectPaymentReducer],
  payment => payment.paymentRequestError
);
