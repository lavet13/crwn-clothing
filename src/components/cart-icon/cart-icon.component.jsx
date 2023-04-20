import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ onToggleCart, quantity }) => {
  return (
    <div onClick={onToggleCart} className='cart-icon-container'>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{quantity}</span>
    </div>
  );
};

export default CartIcon;
