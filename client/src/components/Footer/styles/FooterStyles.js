import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid black;
  padding: 30px;
  width: 1026px;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 550px) {
    font-size: 0.7rem;
    flex-direction: column;
  }
`;
