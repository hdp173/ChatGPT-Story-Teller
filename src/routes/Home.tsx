import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Container, Text } from 'styled-minimal';

import { STATUS } from 'literals';

import { clearStory, nextStory } from 'actions';

import Background from 'components/Background';
import Icon from 'components/Icon';
import Loading from 'components/Loading';
import Subtitle from 'components/Subtitle';

// import Title from 'components/Title';
import { RootState } from 'types';

const Input = styled.input`
  font-family: 'Indie Flower';
  font-size: 3rem;
  text-align: center;
  letter-spacing: inherit;
  color: currentColor;
  padding: 4px 0 5px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 0;
  background: none;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  display: block;
  padding: 16.5px 14px;
  margin-bottom: 30px;
  color: red !important;
`;

function Home() {
  const dispatch = useDispatch();
  const status = useSelector<RootState>(({ story }) => story.status);
  const question = useSelector<RootState>(({ story }) => story.question) as string | null;
  // const title = useSelector<RootState>(({ story }) => story.title) as string | null;
  const isRunning = status === STATUS.RUNNING;

  // const [backgroundImage, setBackgroundImage] = useState('1');
  // const [titleDisplayed, setTitleDisplayed] = useState(false);
  const [subtitleDisplayed, setSubtitleDisplayed] = useState(false);
  const [answer, setAnswer] = useState('');
  // const answerRef = useRef(null);

  // const switchBackground = () => {
  //   setBackgroundImage(`${Math.floor(Math.random() * 5 + 1)}`);
  // };

  useEffect(() => {
    // switchBackground();
    dispatch(nextStory());
  }, []);

  const handleClickNext = () => {
    if (answer) {
      // switchBackground();
      dispatch(nextStory(answer));
      setAnswer('');
    }
  };

  const handleClickClear = () => {
    dispatch(clearStory());
    // switchBackground();
    dispatch(nextStory());
  };

  return (
    <Background
      key="Home"
      about={isRunning ? 'loading' : 'loaded'} /* itemID={backgroundImage} */
      data-testid="Home"
    >
      {isRunning ? (
        <Container fullScreen>
          <Loading />
        </Container>
      ) : (
        <div style={{ height: '74vh', overflow: 'auto', top: '13vh', margin: 'auto' }}>
          {/* <Title display={setTitleDisplayed}>{title || ''}</Title>
          {titleDisplayed && (
            <> */}
          <Subtitle display={setSubtitleDisplayed}>{question || ''}</Subtitle>

          <div
            style={{
              visibility: subtitleDisplayed ? 'visible' : 'hidden',
              textAlign: 'center',
              transform: 'scale(1)',
            }}
          >
            <Input
              autoComplete="off"
              name="answer"
              onChange={event => {
                setAnswer(event.target.value);
              }}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  handleClickNext();
                }
              }}
              placeholder="Enter your answer here"
              required
              type="text"
              value={answer}
            />
            <Button
              busy={status === STATUS.RUNNING}
              data-testid="Clear"
              mr={2}
              onClick={handleClickClear}
              size="xl"
              // style={{ position: 'absolute', right: '80px', bottom: '80px' }}
              textTransform="uppercase"
              type="submit"
              variant="info"
            >
              <Text mr={2}>Clear</Text>
              <Icon name="bolt" />
            </Button>
            <Button
              busy={status === STATUS.RUNNING}
              data-testid="Login"
              mb={5}
              onClick={handleClickNext}
              size="xl"
              textTransform="uppercase"
              type="submit"
              variant="success"
            >
              <Text mr={2}>Next</Text>
              <Icon name="check" />
            </Button>
          </div>
          {/* </>
          )} */}
        </div>
      )}
    </Background>
  );
}

export default Home;
