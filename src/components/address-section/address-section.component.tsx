import { AddressElement } from '@stripe/react-stripe-js';

import { AddressSectionContainer } from './address-section.styles';
import { Fragment, FC } from 'react';
import {
  StripeAddressElementChangeEvent,
  StripeAddressElementOptions,
} from '@stripe/stripe-js';

const ADDRESS_ELEMENT_OPTIONS: StripeAddressElementOptions = {
  mode: 'shipping',
};

type AddressSectionProps = {
  onChange: (event: StripeAddressElementChangeEvent) => any;
};

const AddressSection: FC<AddressSectionProps> = ({ onChange }) => {
  return (
    <Fragment>
      <h2>Address Information:</h2>
      <AddressSectionContainer>
        <AddressElement options={ADDRESS_ELEMENT_OPTIONS} onChange={onChange} />
      </AddressSectionContainer>
    </Fragment>
  );
};

export default AddressSection;
