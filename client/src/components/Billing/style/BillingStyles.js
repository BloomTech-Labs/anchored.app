import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 800px;
  transform: translate(0px, 150px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.h2`
  font-family: Helvetica;
  text-decoration: underline;
  margin-bottom: 30px;
`;

const ContentHeader = styled.h3`
  font-family: Helvetica;
  margin-bottom: 30px;
`;

const Invoice = styled.ul`
  font-family: Helvetica;
`;

const ButtonWrapper = styled.div`
  width: 400px;
  margin: 0 auto;
`;

export { Wrapper, MainHeader, ContentHeader, ButtonWrapper, Invoice };
