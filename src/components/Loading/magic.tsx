import React from 'react';
import styled from 'styled-components';
import { responsive } from 'styled-minimal';

const Container = styled.div`
  width: 500px;
  height: 500px;

  ${
    /* sc-custom '@media-query' */ responsive({
      xs: {
        transform: 'scale(0.4)',
      },
      md: {
        transform: 'scale(0.6)',
      },
      lg: {
        transform: 'scale(0.8)',
      },
    })
  };
`;

const Circle1 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border: 10px solid var(--color-primary);
  border-radius: 600px;
  border-right-color: transparent;
  border-left-color: transparent;
  animation: Move-Right-360 5s infinite;
  -webkit-animation: Move-Right-360 2s infinite;

  @-webkit-keyframes Move-Left-360 {
    100% {
      -webkit-transform: rotate(-360deg);
      transform: rotate(-360deg);
    }
  }

  @keyframes Move-Left-360 {
    100% {
      -webkit-transform: rotate(-360deg);
      transform: rotate(-360deg);
    }
  }
`;

const Circle2 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border: 10px solid var(--color-primary);
  border-radius: 600px;
  border-top-color: transparent;
  border-bottom-color: transparent;
  animation: Move-Left-360 5s infinite;
  -webkit-animation: Move-Left-360 2s infinite;
`;

const Circle3 = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border: 10px solid var(--color-primary);
  border-radius: 600px;
  margin-top: 100px;
  margin-left: 100px;
  border-right-color: transparent;
  border-left-color: transparent;
  animation: Move-Right-360 5s infinite;
  -webkit-animation: Move-Right-360 2s infinite;
`;

const Circle4 = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 10px solid var(--color-primary);
  border-radius: 600px;
  margin-top: 150px;
  margin-left: 150px;
  border-right-color: transparent;
  border-left-color: transparent;
  animation: Move-Left-360 5s infinite;
  -webkit-animation: Move-Left-360 2s infinite;
`;

const Circle5 = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 10px solid var(--color-primary);
  border-radius: 600px;
  margin-top: 200px;
  margin-left: 200px;
  border-right-color: transparent;
  border-left-color: transparent;
  animation: Move-Right-360 5s infinite;
  -webkit-animation: Move-Right-360 2s infinite;
`;

const Square1 = styled.div`
  position: absolute;
  margin-top: 80px;
  margin-left: 80px;
  width: 340px;
  height: 340px;
  border: 10px solid var(--color-primary);
  animation: Move-Right-90 5s infinite;
  -webkit-animation: Move-Right-90 2s infinite;

  @-webkit-keyframes Move-Right-90 {
    100% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }

  @keyframes Move-Right-90 {
    100% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
`;

const Square2 = styled.div`
  position: absolute;
  margin-top: 80px;
  margin-left: 80px;
  width: 340px;
  height: 340px;
  border: 10px solid var(--color-primary);
  animation: Move-Right-180 5s infinite;
  -webkit-animation: Move-Right-180 2s infinite;

  @-webkit-keyframes Move-Right-180 {
    100% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }

  @keyframes Move-Right-180 {
    100% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
  }
`;

const Square3 = styled.div`
  position: absolute;
  margin-top: 80px;
  margin-left: 80px;
  width: 340px;
  height: 340px;
  border: 10px solid var(--color-primary);
  animation: Move-Right-270 5s infinite;
  -webkit-animation: Move-Right-270 2s infinite;

  @-webkit-keyframes Move-Right-270 {
    100% {
      -webkit-transform: rotate(27);
      transform: rotate(270deg);
    }
  }

  @keyframes Move-Right-270 {
    100% {
      -webkit-transform: rotate(27);
      transform: rotate(270deg);
    }
  }
`;

const Square4 = styled.div`
  position: absolute;
  margin-top: 80px;
  margin-left: 80px;
  width: 340px;
  height: 340px;
  border: 10px solid var(--color-primary);
  animation: Move-Right-360 5s infinite;
  -webkit-animation: Move-Right-360 2s infinite;

  @-webkit-keyframes Move-Right-360 {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes Move-Right-360 {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default function Magic() {
  return (
    <Container>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Circle4 />
      <Circle5 />

      <Square1 />
      <Square2 />
      <Square3 />
      <Square4 />
    </Container>
  );
}
