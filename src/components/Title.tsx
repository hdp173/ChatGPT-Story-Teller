import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { responsive } from 'styled-minimal';

interface Props {
  children?: string;
  display?: (b: boolean) => void;
}

const Text = styled.h1`
  text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
    9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
  font-family: Lemon;
  text-transform: uppercase;
  font-size: 6rem;
  font-weight: 400;
  text-align: center;
  margin: 0;
  color: var(--color-primary);
  // color: transparent;
  // background-color: white;
  // background-clip: text;
  animation: shadows 1.2s ease-in infinite, move 1.2s ease-in infinite;
  letter-spacing: 0.4rem;

  @keyframes shadows {
    0% {
      text-shadow: none;
    }
    10% {
      text-shadow: 3px 3px 0 var(--color-secondary);
    }
    20% {
      text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary);
    }
    30% {
      text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
        9px 9px var(--color-quaternary);
    }
    40% {
      text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
        9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
    }
    50% {
      text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
        9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
    }
    60% {
      text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
        9px 9px var(--color-quaternary), 12px 12px 0 var(--color-quinary);
    }
    70% {
      text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary),
        9px 9px var(--color-quaternary);
    }
    80% {
      text-shadow: 3px 3px 0 var(--color-secondary), 6px 6px 0 var(--color-tertiary);
    }
    90% {
      text-shadow: 3px 3px 0 var(--color-secondary);
    }
    100% {
      text-shadow: none;
    }
  }

  @keyframes move {
    0% {
      transform: translate(0px, 0px);
    }
    40% {
      transform: translate(-12px, -12px);
    }
    50% {
      transform: translate(-12px, -12px);
    }
    60% {
      transform: translate(-12px, -12px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }

  ${
    /* sc-custom '@media-query' */ responsive({
      lg: {
        fontSize: '8rem',
      },
    })
  };
`;

function Title(props: Props) {
  const { children = '', display } = props;
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    display && display(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (index === children.length) {
        display && display(true);
      } else {
        setText(text + children[index]);
        setIndex(index + 1);
      }
    }, 100);
  }, [index]);

  return <Text>{text}</Text>;
}

export default Title;
