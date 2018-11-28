import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DashNavBtn = props => {
  let btnName = props.name;

  return <Button>{btnName}</Button>;
};

export default DashNavBtn;
