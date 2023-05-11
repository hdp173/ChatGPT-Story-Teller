import { all, fork } from 'redux-saga/effects';

import github from './github';
import story from './story';
import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(github), fork(story), fork(user)]);
}
