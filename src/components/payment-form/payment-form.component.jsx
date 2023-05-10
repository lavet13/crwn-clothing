import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectPaymentRequest } from '../../store/payment/payment.selector';
import { checkPaymentRequest } from '../../store/payment/payment.action';

import { PaymentButton } from './payment-form.styles';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CardSection from '../card-section/card-section.component';

import { PaymentFormContainer, FormContainer } from './payment-form.styles';

const PaymentForm = () => {
  const dispatch = useDispatch();
  const paymentRequest = useSelector(selectPaymentRequest);
  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);
  const [isProcessingPayment, setIsProccessingPayment] = useState(false);
  const stripe = useStripe(); // to make requests in the format that Stripe needs it to be
  const elements = useElements();

  const paymentHandler = async event => {
    event.preventDefault();

    if (!stripe || !elements || isProcessingPayment) return;

    setIsProccessingPayment(true);

    // creating payment intent... So that Stripe knows that, oh, there is a payment coming.
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then(res => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    });

    setIsProccessingPayment(false);

    if (paymentResult.error) {
      const { message } = paymentResult.error;

      alert(message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful');
      }
    }
  };

  useEffect(() => {
    if (!stripe) return;

    dispatch(checkPaymentRequest(stripe, amount));
  }, [stripe, amount]);

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
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
