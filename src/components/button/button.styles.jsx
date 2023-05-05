import styled from 'styled-components';

export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  padding: 0 35px;

  letter-spacing: 0.5px;
  line-height: 50px;
  font-size: 15px;
  font-family: inherit;
  font-weight: bolder;
  text-transform: uppercase;
  background-color: black;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
  color: white;
  min-width: 260px;

  &:hover {
    background-color: #357ae8;
    border: 1px solid #0026ff;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;
