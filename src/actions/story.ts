import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

export const clearStory = createAction(ActionTypes.STORY_CLEAR);
export const nextStory = createAction(ActionTypes.STORY_NEXT_REQUEST, (answer?: string) =>
  actionPayload(answer),
);
export const nextStorySuccess = createAction(
  ActionTypes.STORY_NEXT_SUCCESS,
  (/* title?: string,  */ question?: string) => actionPayload(/* { title, question } */ question),
);
