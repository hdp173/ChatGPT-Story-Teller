import { STATUS } from 'literals';

import { Topic } from 'types';

export const description = 'Storybot using ChatGPT and Langchain';
export const name = 'Storybot';
export const topic: Topic = {
  cached: false,
  data: [],
  message: '',
  status: STATUS.IDLE,
  updatedAt: 0,
};
