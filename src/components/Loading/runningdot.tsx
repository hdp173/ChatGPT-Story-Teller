import React from 'react';
import styled, { keyframes } from 'styled-components';

const Dot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #333;
  margin-right: 5px;
  opacity: 0.4;
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const DotWrapper = styled.div`
  display: inline-flex;

  & ${Dot}:nth-child(1) {
    animation: ${bounce} 1s infinite ease-in-out;
    animation-delay: -0.32s;
  }
  & ${Dot}:nth-child(2) {
    animation: ${bounce} 1s infinite ease-in-out;
    animation-delay: -0.16s;
  }
  & ${Dot}:nth-child(3) {
    animation: ${bounce} 1s infinite ease-in-out;
    animation-delay: 0s;
  }
`;

function DotRunningLoader() {
  return (
    <DotWrapper>
      <Dot />
      <Dot />
      <Dot />
    </DotWrapper>
  );
}

export default DotRunningLoader;
