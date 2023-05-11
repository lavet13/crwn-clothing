import { AddressElement } from '@stripe/react-stripe-js';

import { AddressSectionContainer } from './address-section.styles';
import { Fragment } from 'react';

const ADDRESS_ELEMENT_OPTIONS = {
  mode: 'shipping',
};

const AddressSection = ({ onChange }) => {
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
