import { Fragment } from 'react';

import { CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Comfortaa", cursive',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CardSection = () => {
  return (
    <Fragment>
      <h2>Credit Card Payment: </h2>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </Fragment>
  );
};

export default CardSection;
