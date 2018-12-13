import styled from 'styled-components';

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1010px;
  margin: 0 auto;
  margin-top: 10px;
  height: 100%;
  padding: 0 5px;
`;

export const Members = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const TeamMember = styled.div`
  margin: 20px;

  img {
    height: 250px;
    width: 250px;
    border-radius: 50%;
    a {
      color: black;
      i {
        color: black;
      }
    }
  }
`;

export const Initials = styled.div`
  height: 250px;
  width: 250px;
  border-radius: 50%;
  background-color: #17a2b8;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
`;

export const Astyle = styled.a`
  color: black;
`;
