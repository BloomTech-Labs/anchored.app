import styled from 'styled-components';

export const CtaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 80px;
`;

export const CtaButton = styled.div`
  border-radius: 7px;
  background-color: #7344c1;
  color: white;
  margin: 30px;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 65px;
  font-weight: bold;
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    background-color: #8e44c2;
  }
`;

export const Demo = styled.div`
  width: 200px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const OurPatrons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1026px;
  max-width: 100%;
  margin: 40px;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
`;

export const Logos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 1026px;
  max-width: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: 10px;
  padding: 10px;
`;

export const H2 = styled.h2`
  padding: 10px;
  font-size: 2rem;

  @media (max-width: 550px) {
    font-size: 1.7rem;
  }
`;

export const H3 = styled.h3`
  font-size: 1rem;
  font-weight: bold;
`;

export const Copy = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0px;

  @media (max-width: 550px) {
    font-size: 1.1rem;
  }
`;

export const Img = styled.img`
  margin-right: 5px;
`;

export const Friends = styled.div`
  border: 1px solid black;
  background-color: lightgray;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;
