import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavButton = props => {
  let btnName = props.name;

  return <Button>{btnName}</Button>;
};

export default NavButton;
