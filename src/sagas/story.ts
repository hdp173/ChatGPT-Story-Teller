import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'literals';

import { nextStorySuccess } from 'actions';

export function* nextStorySaga(): Generator<any, void, any> {
  try {
    const messages = yield select(({ story }) => story.messages);
    const response = yield call(fetch, 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.REACT_APP_OPENAI_CHAT_MODEL,
        messages,
      }),
    });

    const data = yield call([response, response.json]);
    const question = data.choices[0].message.content as string;

    const formattedQuestion = yield call(() => question.replace(/\n/g, ' <br> '));

    yield put(nextStorySuccess(formattedQuestion));
  } catch (error) {
    console.log(error);
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.STORY_NEXT_REQUEST, nextStorySaga)]);
}
