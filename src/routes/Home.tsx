import React, { useEffect, useMemo, useState } from 'react';
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
  font-size: 4rem;
  max-width: 500px;
  outline: 1px solid gray;
  text-align: center;
  letter-spacing: inherit;
  color: currentColor;
  padding: 4px 0 5px;
  border: 0;
  box-sizing: content-box;
  background: none;
  height: 1.4375em;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  display: block;
  min-width: 0;
  width: 100%;
  padding: 16.5px 14px;
  margin-bottom: 30px;
  color: red !important;
`;

function Home() {
  const dispatch = useDispatch();
  const status = useSelector<RootState>(({ story }) => story.status);
  const question = useSelector<RootState>(({ story }) => story.question) as string | null;
  const formattedQuestion = useMemo(() => (!question ? '' : question), [question]);
  const isRunning = status === STATUS.RUNNING;

  const [backgroundImage, setBackgroundImage] = useState('1');
  // const [titleDisplayed, setTitleDisplayed] = useState(false);
  const [subtitleDisplayed, setSubtitleDisplayed] = useState(false);
  const [answer, setAnswer] = useState('');
  // const answerRef = useRef(null);

  const switchBackground = () => {
    setBackgroundImage(`${Math.floor(Math.random() * 5 + 1)}`);
  };

  useEffect(() => {
    switchBackground();
    dispatch(nextStory());
  }, []);

  const handleClickNext = () => {
    if (answer) {
      switchBackground();
      dispatch(nextStory(answer));
      setAnswer('');
    }
  };

  const handleClickClear = () => {
    dispatch(clearStory());
    switchBackground();
    dispatch(nextStory());
  };

  return (
    <Background key="Home" data-testid="Home" itemID={backgroundImage}>
      {isRunning ? (
        <Container fullScreen>
          <Loading />
        </Container>
      ) : (
        <Container fullScreen>
          <Button
            busy={status === STATUS.RUNNING}
            data-testid="Clear"
            mb={5}
            onClick={handleClickClear}
            size="xl"
            style={{ position: 'absolute', right: '80px', bottom: '80px' }}
            textTransform="uppercase"
            type="submit"
            variant="info"
          >
            <Text mr={2}>Clear</Text>
            <Icon name="bolt" />
          </Button>
          {/* <Title display={setTitleDisplayed}>Welcome to our world</Title> */}
          <Subtitle display={setSubtitleDisplayed}>{formattedQuestion}</Subtitle>

          <div
            style={{ visibility: subtitleDisplayed ? 'visible' : 'hidden', textAlign: 'center' }}
          >
            <Input
              autoComplete="off"
              name="answer"
              onChange={event => {
                setAnswer(event.target.value);
              }}
              placeholder="Enter your answer here"
              required
              type="text"
              value={answer}
            />
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
        </Container>
      )}
    </Background>
  );
}

export default Home;
