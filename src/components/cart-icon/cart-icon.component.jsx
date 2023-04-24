import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, Icon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const { setIsCartOpen, isCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <Icon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
