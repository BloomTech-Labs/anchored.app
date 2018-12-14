import styled from 'styled-components';

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1010px;
  margin: 0 auto;
  margin-top: 70px;
  height: 100%;
  padding: 0 5px;
`;

export const Members = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 30px;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

export const TeamMember = styled.div`
  margin: 20px;

  img {
    height: 250px;
    width: 250px;
    border-radius: 50%;
  }
`;

export const Astyle = styled.a`
  color: black;
  padding: 5px;

  &:hover {
    color: #7344c1;
  }
`;

export const NameHeader = styled.h4`
  padding-top: 10px;
`;

export const Role = styled.p``;

export const H1 = styled.h1`
  margin-bottom: 40px;
`;
