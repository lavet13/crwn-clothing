import { useEffect, useState } from 'react';
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

const defaultAddressFields = {
  name: '',
  address: {
    city: '',
    country: 'RU',
    line1: '',
    line2: null,
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
  const stripe = useStripe(); // to make requests in the format that Stripe needs it to be
  const elements = useElements();

  const paymentHandler = async event => {
    event.preventDefault();
    console.log(isAddressComplete);
    if (!isAddressComplete) return alert("Address isn't complete");

    if (!stripe || !elements || isProcessingPayment) return;

    // creating payment intent... So that Stripe knows that, oh, there is a payment coming.
    dispatch(
      cardPaymentStart(stripe, elements, CardElement, addressState, amount)
    );
  };

  const addressChangeHandler = event => {
    setAddressState(event.value);
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
        {paymentRequestErrorMessage && <p>{paymentRequestErrorMessage}</p>}
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
