import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1026px;
  width: 100%;
  margin: 0 auto;
`;

export const BgContainer = styled.div`
  width: 100vw;
  background: rgba(230, 232, 230, 0.4);
`;

export const MiddleWorks = styled.div`
  /* z-index: 1; */
  /* opacity: 1; */
`;

export const ContentMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1026px;
  width: 100%;
  margin: 0 auto;
  opacity: 1;
`;

export const H1 = styled.h1`
  font-size: 2rem;
  margin: 40px;
`;

export const H2 = styled.h2`
  font-size: 1.6rem;
  padding-top: 50px;
`;

export const ContentSet = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: 1;

  &:nth-child(5) {
    max-width: 550px;
    padding-bottom: 30px;
    margin: 0 auto;
  }

  @media (max-width: 550px) {
    flex-direction: column;

    &:nth-child(3) {
      flex-direction: column-reverse;
    }
  }
`;

export const NumberedImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Numbered = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const PricingSection = styled.div`
  width: 100%;
  background-color: white;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
`;

export const Copy = styled.p`
  font-size: 1.1rem;
  max-width: 550px;
  width: 100%;
  text-align: left;
  padding: 30px;
  margin-top: 30px;
  opacity: 1;
  z-index: 100;
`;

export const TagLine = styled.p`
  font-size: 1.1rem;
  max-width: 450px;
  text-align: left;
  padding: 10px;
  margin-bottom: 0px;
`;

export const PlayImg = styled.img`
  max-width: 10%;
`;
