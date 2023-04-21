import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { id, name, imageUrl, quantity, price } = cartItem;
  const {
    deleteItemFromCart,
    incrementQuantityOfCartItem,
    decrementQuantityOfCartItem,
  } = useContext(CartContext);

  const deleteProductFromCart = () => deleteItemFromCart(id);
  const incrementQuantityOfItem = () =>
    incrementQuantityOfCartItem(id, quantity);
  const decrementQuantityOfItem = () =>
    decrementQuantityOfCartItem(id, quantity);

  return (
    <div>
      <h2>{name}</h2>
      <button onClick={decrementQuantityOfItem}>{'<'}</button>
      <h3>{quantity}</h3>
      <button onClick={incrementQuantityOfItem}>{'>'}</button>
      <button onClick={deleteProductFromCart}>&times;</button>
    </div>
  );
};

export default CheckoutItem;
