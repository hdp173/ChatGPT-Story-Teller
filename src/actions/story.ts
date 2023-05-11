import { createAction } from '@reduxjs/toolkit';

import { actionPayload } from 'modules/helpers';

import { ActionTypes } from 'literals';

export const nextStory = createAction(ActionTypes.STORY_NEXT_REQUEST, (answer?: string) =>
  actionPayload(answer),
);
export const nextStorySuccess = createAction(ActionTypes.STORY_NEXT_SUCCESS, (question?: string) =>
  actionPayload(question),
);
