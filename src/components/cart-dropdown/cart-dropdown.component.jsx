import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';

import {
  CartDropdownContainer,
  CartItems,
  DropdownButton,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate(); // getting navigate function from useNavigate hook

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.map(item => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </CartItems>

      <DropdownButton
        className='button-container'
        onClick={goToCheckoutHandler}
      >
        GO TO CHECKOUT
      </DropdownButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
