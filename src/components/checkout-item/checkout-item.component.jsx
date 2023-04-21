import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { id, name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, deleteItemFromCart, addItemToCart } =
    useContext(CartContext);

  const deleteProductFromCart = () => deleteItemFromCart(cartItem);

  const addProductToCart = () => addItemToCart(cartItem);

  const removeProductFromCart = () => removeItemFromCart(cartItem);

  return (
    <div>
      <h2>{name}</h2>
      <button onClick={removeProductFromCart}>{'<'}</button>
      <h3>{quantity}</h3>
      <button onClick={addProductToCart}>{'>'}</button>
      <button onClick={deleteProductFromCart}>&times;</button>
    </div>
  );
};

export default CheckoutItem;
