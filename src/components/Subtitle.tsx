import React, { useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  children?: string;
  display?: (b: boolean) => void;
}

const Paragraph = styled.div`
  max-width: 32ch;
  margin: 2.5rem auto;
  font-family: 'Indie Flower';
  font-size: 3rem;
  font-weight: 900;
  // text-align: center;
  // transform: scale(0.8);
  // animation: scale 10s forwards cubic-bezier(0.5, 1, 0.89, 1);

  // @keyframes scale {
  //   100% {
  //     transform: scale(1);
  //   }
  // }
`;

const Word = styled.span`
  display: inline-block;
  opacity: 0;
  filter: blur(4px);

  @keyframes fade-in {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
`;

function Subtitle(props: Props) {
  const { children = '', display } = props;

  useEffect(() => {
    if (display) {
      display(false);
      setTimeout(() => {
        display(true);
      }, children.split(' ').length * 200 + 1000);
    }
  }, []);

  return (
    <Paragraph>
      {children.split(' ').map((word, index) =>
        word === '<br>' ? (
          <br key={index} />
        ) : (
          <Word
            key={index}
            style={{
              animation: `fade-in 0.8s ${
                (index + 1) * 0.2
              }s forwards cubic-bezier(0.11, 0, 0.5, 0)`,
            }}
          >
            {word}&nbsp;
          </Word>
        ),
      )}
    </Paragraph>
  );
}

export default Subtitle;
