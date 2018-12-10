import styled from 'styled-components';
import { CSVLink } from 'react-csv';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 30px;
  max-width: 1010px;
  height: 100%;
  padding: 0 20px;
`;

export const InvoiceContainer = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
`;

export const InvoiceInfo = styled.div`
  border: 1px solid white;
  padding: 10px;
  font-size: 1.2rem;
  width: 100%;
  background: #7344c1;
  color: white;
`;

export const InfoContainer = styled.div``;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media (max-width: 550px) {
    justify-content: center;
    align-items: center;
  }
`;

export const InfoDate = styled.div`
  width: 100%;
`;

export const InfoTransaction = styled.div`
  width: 100%;
`;

export const InfoAmountBilled = styled.div`
  width: 100%;
`;

export const InfoWrapperTwo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #7344c1;
  padding: 15px;
`;

export const MainHeader = styled.h3`
  display: flex;
  margin-bottom: 30px;

  @media (max-width: 550px) {
    justify-content: center;
    align-items: center;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const ContentHeader = styled.h3`
  color: rgb(108, 117, 125);
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 10px;
`;

export const ButtonWrapper = styled.div`
  width: 400px;
  margin: 0 auto;
`;

export const ExportContainer = styled.div`
  display: flex;
  margin: 20px;
  justify-content: flex-end;
`;

export const Export = styled(CSVLink)`
  color: #117a8b;
`;
