import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'literals';

import { nextStorySuccess } from 'actions';

export function* nextStorySaga(): Generator<any, void, any> {
  try {
    const messages = yield select(({ story }) => story.messages);
    const response1 = yield call(fetch, 'https://api.openai.com/v1/chat/completions', {
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

    const data1 = yield call([response1, response1.json]);
    const question = data1.choices[0].message.content as string;

    /*     let title = 'Welcome to our world!';

    if (messages.length > 2) {
      const response2 = yield call(fetch, 'https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.REACT_APP_OPENAI_CHAT_MODEL,
          messages: [
            {
              role: 'system',
              content: `Generate new interesting proper title from following article very shortly. DON'T extract title from Chapter headings.\n\n${question}`,
            },
          ],
        }),
      });

      const data2 = yield call([response2, response2.json]);

      title = data2.choices[0].message.content as string;
    }
 */
    const formattedQuestion = yield call(() => question.replace(/\n/g, ' <br> '));

    yield put(nextStorySuccess(/* title,  */ formattedQuestion));
  } catch (error) {
    console.log(error);
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.STORY_NEXT_REQUEST, nextStorySaga)]);
}
