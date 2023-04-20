import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ onToggle }) => {
  return (
    <div onClick={onToggle} className='cart-icon-container'>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  );
};

export default CartIcon;
