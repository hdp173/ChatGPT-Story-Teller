import styled from 'styled-components';

const Background = styled.div`
  color: black;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;

  &:before {
    background-image: url(${process.env.PUBLIC_URL}/media/images/background.png);
    background-size: cover;
    background-position: center;
    transition: 0.5s ease-in-out;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

// ${props =>
//   props.about === 'loading' ? 'filter: blur(2px);opacity: 0.5;' : 'filter: none; opacity: 1; '}
export default Background;
