import styled from 'styled-components';
import { BaseButton } from '../button/button.styles';

export const CartDropdownContainer = styled.div`
  width: 260px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;

  position: absolute;
  top: 75px;
  right: 0;
  z-index: 5;
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const DropdownButton = styled(BaseButton)`
  margin-top: auto;
`;

// .cart-dropdown-container {

//   .empty-message {
//     font-size: 18px;
//     margin: 50px auto;
//   }

//   .cart-link {
//     button {
//       width: 100%;
//     }
//   }
// }
