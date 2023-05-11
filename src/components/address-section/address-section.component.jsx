import { AddressElement } from '@stripe/react-stripe-js';

const ADDRESS_ELEMENT_OPTIONS = {
  mode: 'shipping',
};

const AddressSection = ({ onChange }) => {
  return (
    <div>
      <h3>Shipping</h3>
      <AddressElement options={ADDRESS_ELEMENT_OPTIONS} onChange={onChange} />
    </div>
  );
};

export default AddressSection;
