import styled from 'styled-components';

export const SignInContainer = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  width: 480px;
  margin: 0 auto;

  h2 {
    margin: 10px 0;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;

  @media only screen and (max-width: 32.5em) {
    flex-direction: column;
    row-gap: 15px;
    justify-content: stretch;
  }
`;
