import styled from 'styled-components';

export const ContentMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1026px;
  width: 100%;
  margin: 0 auto;
`;

export const H1 = styled.h1`
  font-size: 2rem;
  margin: 40px;
`;

export const H2 = styled.h2`
  font-size: 1.4rem;
`;

export const ContentSet = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:nth-child(5) {
    border-bottom: 1px solid black;
    padding-bottom: 30px;
  }

  @media (max-width: 550px) {
    flex-direction: column;

    &:nth-child(3) {
      border: 2px solid red;
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

export const Image = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: lightgrey;
`;

export const Copy = styled.p`
  font-size: 1.1rem;
  max-width: 550px;
  width: 100%;
  text-align: left;
  padding: 30px;
  margin-top: 30px;
`;

export const TagLine = styled.p`
  font-size: 1.1rem;
  max-width: 450px;
  text-align: left;
  padding: 10px;
  margin-bottom: 0px;
`;

export const PlayImg = styled.img`
  width: 10%;
`;
