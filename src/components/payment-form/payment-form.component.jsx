import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  CardElement,
  AddressElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector';
import {
  selectPaymentIsLoading,
  selectPaymentRequest,
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

const PaymentForm = () => {
  const dispatch = useDispatch();
  const paymentRequest = useSelector(selectPaymentRequest);
  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);
  const isProcessingPayment = useSelector(selectPaymentIsLoading);
  const stripe = useStripe(); // to make requests in the format that Stripe needs it to be
  const elements = useElements();

  const paymentHandler = async event => {
    event.preventDefault();

    if (!stripe || !elements || isProcessingPayment) return;

    // creating payment intent... So that Stripe knows that, oh, there is a payment coming.
    dispatch(
      cardPaymentStart(stripe, elements, CardElement, currentUser, amount)
    );
  };

  const addressChangeHandler = event => {
    console.log(event);
    console.log(event.value);
    if (event.complete) {
      // Extract potentially complete address
    }
  };

  useEffect(() => {
    if (!stripe) return;

    dispatch(checkPaymentRequest(stripe, amount));
  }, [stripe, amount]);

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
          <PaymentRequestButtonElement
            options={{ paymentRequest }}
          ></PaymentRequestButtonElement>
        )}
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
