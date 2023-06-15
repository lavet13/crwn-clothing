import { PAYMENT_ACTION_TYPES } from './payment.types';
import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';
import { PaymentRequest, Stripe, StripeElements } from '@stripe/stripe-js';
import { CardElementComponent } from '@stripe/react-stripe-js';
import { DefaultAddressFields } from '../../components/payment-form/payment-form.component';

export type CheckPaymentRequest = ActionWithPayload<
  PAYMENT_ACTION_TYPES.CHECK_PAYMENT_REQUEST,
  { stripe: Stripe; amount: number }
>;

export type PaymentRequestSuccess = ActionWithPayload<
  PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_SUCCESS,
  PaymentRequest
>;

export type PaymentRequestFailed = ActionWithPayload<
  PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_FAILED,
  Error
>;

export type CardPaymentStart = ActionWithPayload<
  PAYMENT_ACTION_TYPES.CARD_PAYMENT_START,
  {
    stripe: Stripe;
    elements: StripeElements;
    CardElement: CardElementComponent;
    address: DefaultAddressFields;
    amount: number;
  }
>;

export type CardPaymentSuccess =
  ActionWithPayload<PAYMENT_ACTION_TYPES.CARD_PAYMENT_SUCCESS>;

export const checkPaymentRequest = withMatcher(
  (stripe: Stripe, amount: number): CheckPaymentRequest =>
    createAction(PAYMENT_ACTION_TYPES.CHECK_PAYMENT_REQUEST, { stripe, amount })
);

export const paymentRequestSuccess = withMatcher(
  (paymentRequest: PaymentRequest): PaymentRequestSuccess =>
    createAction(PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_SUCCESS, paymentRequest)
);

export const paymentRequestFailed = withMatcher(
  (error: Error): PaymentRequestFailed =>
    createAction(PAYMENT_ACTION_TYPES.PAYMENT_REQUEST_FAILED, error)
);

export const cardPaymentStart = withMatcher(
  (
    stripe: Stripe,
    elements: StripeElements,
    CardElement: CardElementComponent,
    address: DefaultAddressFields,
    amount: number
  ): CardPaymentStart =>
    createAction(PAYMENT_ACTION_TYPES.CARD_PAYMENT_START, {
      stripe,
      elements,
      CardElement,
      address,
      amount,
    })
);

export const cardPaymentSuccess = status =>
  createAction(PAYMENT_ACTION_TYPES.CARD_PAYMENT_SUCCESS, status);

export const cardPaymentFailed = error =>
  createAction(PAYMENT_ACTION_TYPES.CARD_PAYMENT_FAILED, error);
