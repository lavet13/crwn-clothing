import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

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
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div onClick={removeItemHandler} className='arrow'>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div onClick={addItemHandler} className='arrow'>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
