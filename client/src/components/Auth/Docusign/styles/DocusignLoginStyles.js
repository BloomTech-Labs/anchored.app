import styled from 'styled-components';
import { CtaButton } from '../../../CTA/styles/CTAStyles.js';

export const AppBtn = styled(CtaButton)`
  width: 160px;
  font-size: 1rem;
  font-weight: normal;
  height: 40px;

  &:hover {
    cursor: pointer;
    background-color: #8e44c2;
  }
`;
