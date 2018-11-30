import styled from 'styled-components';

export const ModalWrapper = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(211, 210, 211, 0.9);
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 532.83px;
  margin-top: 169px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  padding-top: 44px;

  p {
    margin-top: 0;
  }
`;

export const ModalInfo = styled.p`
  font-size: 1rem;
`;

export const ModalLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
`;
