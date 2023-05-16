import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Container, Text } from 'styled-minimal';

import { GoogleApiContext } from 'modules/GoogleApiContext';

import { STATUS } from 'literals';

import { clearStory, nextStory } from 'actions';

import Background from 'components/Background';
import Icon from 'components/Icon';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
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
  const [open, setOpen] = useState(false);
  // const answerRef = useRef(null);
  const { loaded, tokenClient } = useContext(GoogleApiContext);

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

  const handleClickSave = async () => {
    if (tokenClient == null) {
      return;
    }

    (tokenClient as any).callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }

      setOpen(true);
    };

    if ((window as any).gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      (tokenClient as any).requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      (tokenClient as any).requestAccessToken({ prompt: '' });
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
              busy={!loaded}
              data-testid="Save"
              mr={2}
              onClick={handleClickSave}
              size="xl"
              // style={{ position: 'absolute', right: '80px', bottom: '80px' }}
              textTransform="uppercase"
              type="submit"
              variant="primary"
            >
              <Text mr={2}>Save</Text>
              <Icon name="bell" />
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
      <Modal isOpen={open} onClose={() => setOpen(false)} />
    </Background>
  );
}

export default Home;
