import { createContext } from 'react';

export const GoogleApiContext = createContext({
  tokenClient: null,
  loaded: false,
});
