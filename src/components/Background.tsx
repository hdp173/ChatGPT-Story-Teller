import styled from 'styled-components';

const Background = styled.div`
  color: blue;
  min-height: 100vh;
  overflow: hidden;
  position: relative;

  &:before {
    background-image: url(${process.env.PUBLIC_URL}/media/images/${props => props.itemID}.png);
    background-size: cover;
    background-position: center;
    transition: background-image 0.5s ease-in-out;
    filter: blur(2px);
    opacity: 0.5;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0.4;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export default Background;
