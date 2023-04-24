import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Name = styled.span`
  width: 23%;
`;

export const Quantity = styled.span`
  width: 23%;

  display: flex;

  span {
    margin: 0 10px;
  }
`;

export const Price = styled.span`
  width: 23%;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const RemoveButton = styled.div`
  flex: 0 0 10%;
  text-align: center;
  cursor: pointer;
`;
