import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { selectCartTotal } from '../../store/cart/cart.selector';
import {
  selectPaymentIsLoading,
  selectPaymentRequest,
  selectPaymentRequestError,
} from '../../store/payment/payment.selector';
import {
  cardPaymentStart,
  checkPaymentRequest,
} from '../../store/payment/payment.action';

import { PaymentButton } from './payment-form.styles';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CardSection from '../card-section/card-section.component';

import { PaymentFormContainer, FormContainer } from './payment-form.styles';
import AddressSection from '../address-section/address-section.component';
import { StripeAddressElementChangeEvent } from '@stripe/stripe-js';

export type DefaultAddressFields = {
  name: string;
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string | undefined;
    postal_code: string;
    state: string;
  };
};

const defaultAddressFields: DefaultAddressFields = {
  name: '',
  address: {
    city: '',
    country: 'RU',
    line1: '',
    line2: undefined,
    postal_code: '',
    state: '',
  },
};

const PaymentForm = () => {
  const [addressState, setAddressState] = useState(defaultAddressFields);
  const [isAddressComplete, setIsAddressComplete] = useState(false);
  const dispatch = useDispatch();
  const paymentRequest = useSelector(selectPaymentRequest);
  const paymentRequestErrorMessage = useSelector(selectPaymentRequestError);
  const amount = useSelector(selectCartTotal);
  const isProcessingPayment = useSelector(selectPaymentIsLoading);
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(isAddressComplete);
    if (!isAddressComplete) return alert("Address isn't complete");

    if (!stripe || !elements || isProcessingPayment) return;

    // creating payment intent... So that Stripe knows that, oh, there is a payment coming.
    dispatch(
      cardPaymentStart(stripe, elements, CardElement, addressState, amount)
    );
  };

  const addressChangeHandler = (event: StripeAddressElementChangeEvent) => {
    setAddressState(event.value as typeof addressState);
    setIsAddressComplete(event.complete);
  };

  useEffect(() => {
    if (!stripe) return;

    dispatch(checkPaymentRequest(stripe, amount));
  }, [stripe, amount, dispatch]);

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <AddressSection onChange={addressChangeHandler} />
        <CardSection />
        <PaymentButton
          isLoading={isProcessingPayment}
          type='submit'
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
        {paymentRequest && (
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        )}
        {paymentRequestErrorMessage && (
          <p>{paymentRequestErrorMessage.message}</p>
        )}
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
