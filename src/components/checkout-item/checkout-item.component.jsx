import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, deleteItemFromCart, addItemToCart } =
    useContext(CartContext);

  const deleteProductFromCart = () => deleteItemFromCart(cartItem);

  const addProductToCart = () => addItemToCart(cartItem);

  const removeProductFromCart = () => removeItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <button onClick={removeProductFromCart}>{'<'}</button>
      <span className='quantity'>{quantity}</span>
      <button onClick={addProductToCart}>{'>'}</button>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={deleteProductFromCart}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
