import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  max-width: 1100px;
  margin: 0 auto;
  align-items: center;
  gap: 70px;

  @media only screen and (max-width: 32.5em) {
    padding: 0 15px;
    padding-top: 30px;
  }
`;
