import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quantity,
  Price,
  Arrow,
  RemoveButton,
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, clearItemFromCart, addItemToCart } =
    useContext(CartContext);

  // two purposes of why we are creating outside handlers rather
  // than putting these anynomous functions directly into these onClick areas:
  // 1) If these methods ever change we have a very clear idea of where these definitions are rather than
  // being inside of our jsx, there are in a place where we know we instantiate and initialize all of our helper functions
  // and anything like that it's just for code clarity, so it's easy to update these if need be
  // 2) By doing this we actually be able to optimize this code (we'll talk about that later)
  const clearItemHandler = () => clearItemFromCart(cartItem);

  const addItemHandler = () => addItemToCart(cartItem);

  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <span>{quantity}</span>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
