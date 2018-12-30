// 256 x 375
import styled from 'styled-components';
import { CtaButton } from '../../CTA/styles/CTAStyles.js';

export const BoxContainer = styled.div`
  min-height: 400px;
  width: 265px;
  margin: 30px;
  margin-bottom: 100px;
  background-color: #f5f6f5;
  border-radius: 5px;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.4);

  &:hover {
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 550px) {
    &:first-child {
      margin-bottom: 2px;
    }
  }
`;

export const BoxButton = styled(CtaButton)`
  width: 185px;
  height: 52px;
  margin: 0 auto;
  margin-top: 30px;
`;

export const H3 = styled.h3`
  font-size: 1.32rem;
  font-weight: bold;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const Copy = styled.p`
  font-size: 1.1rem;
  padding: 10px;
`;
