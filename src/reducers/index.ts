import alerts, { alertsState } from './alerts';
import app, { appState } from './app';
import github, { githubState } from './github';
import story, { storyState } from './story';
import user, { userState } from './user';

export const initialState = {
  alerts: alertsState,
  app: appState,
  github: githubState,
  user: userState,
  story: storyState,
};

export default {
  ...alerts,
  ...app,
  ...github,
  ...user,
  ...story,
};
