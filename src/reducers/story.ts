import { createReducer } from '@reduxjs/toolkit';

import { STATUS } from 'literals';

import { nextStory, nextStorySuccess } from 'actions';

import { StoryState } from 'types';

export const storyState = {
  question: null,
  messages: [
    {
      role: 'system',
      content: `
      Create a YA allegory (lexile 900) with magic elements. The unchangeable story arc unfolds in sixteen (16) chapters with an average length of 1,800-words chapters, each ending with two options for plot direction.
      The main setting is a school for magic and diplomacy in {Kingdom}. Engage the user in a colloquial and chatty way, posing questions serially to gather details about the kingdom name, hero/protagonist, low status job, magical creature, special power, school name, and magical game. After obtaining the necessary information, ask the user if they're ready to begin the first chapter. The protagonist, a middle-status child of the Vizier, has a lower-status friend and a magical companion. The story climaxes at the annual 'harvest of the magical creatures', which the protagonist stops using her powers.
      The themes from Gabor Matė are that {the Condition} is not genetic. The inherited attribute is being highly sensitive which {protagonist} shares with a long line of Viziers. {The Condition} predisposed {Protagonist} to a {special power} Because they are always tuned into slightly different frequencies than the other royal and court kids at {School}. People with the condition can be hard to reach and see regular people as slightly blurry and hear them as faintly distant like in a crowded room with lots of other crosstalk and confounding inputs competing for attention.  {Protagonist} learns to focus with the help and energy of {magical pet} but it is draining. At the climax of the novel, {protagonist} uses all their focus to win {strategic magical game} against the royals. This is instrumental to the climax of saving the {magical creatures} from the annual harvest.
      There is a way to practice love and presence through caring for others that enhances {special power}.  Over the course of the novel there are moments when {protagonist} can feel her powers growing as she has done something particularly in alignment with {VALUES}.
      For each major plot variable above highlighted we can draft a set of questions or attributes we’d like the chatbot to collect.  For example:
      Ask questions of the reader to establish key facts about {Kingdom, low-status occupation, magical creature, special power, magic school norms, strategy game with magical elements}.  Each of these elements should be fed into a general fact pattern document that can be referenced by the chatmodel as it co-creates each chapter with the reader.
      `,
      // content: 'You are a fantastic story maker.',
    },
  ],
  status: STATUS.IDLE,
};

export default {
  story: createReducer<StoryState>(storyState, builder => {
    builder
      .addCase(nextStory, (draft, { payload }) => {
        draft.question && draft.messages.push({ role: 'assistant', content: draft.question });
        payload && draft.messages.push({ role: 'user', content: payload });
        draft.status = STATUS.RUNNING;
      })
      .addCase(nextStorySuccess, (draft, { payload }) => {
        draft.question = !payload ? null : payload;
        draft.status = STATUS.READY;
      });
  }),
};
