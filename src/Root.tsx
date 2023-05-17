import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { selectUser } from 'selectors';
import styled, { ThemeProvider } from 'styled-components';
import { px } from 'styled-minimal';
import useTreeChanges from 'tree-changes-hook';

import { GoogleApiContext } from 'modules/GoogleApiContext';
import { useAppSelector } from 'modules/hooks';
import theme, { headerHeight } from 'modules/theme';

import { name } from 'config';

import { showAlert } from 'actions';

// import Footer from 'components/Footer';
import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import SystemAlerts from 'containers/SystemAlerts';
import Home from 'routes/Home';
import NotFound from 'routes/NotFound';
import Private from 'routes/Private';

import { UserState } from 'types';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const Main = styled.main<Pick<UserState, 'isAuthenticated'>>`
  min-height: 100vh;
  padding: ${({ isAuthenticated }) => (isAuthenticated ? `${px(headerHeight)} 0 0` : 0)};
`;

function Root() {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const { changed } = useTreeChanges(user);

  const { isAuthenticated } = user;

  useEffect(() => {
    if (changed('isAuthenticated', true)) {
      dispatch(showAlert('Hello! And welcome!', { variant: 'success', icon: 'bell', timeout: 10 }));
    }
  }, [dispatch, changed]);

  const [tokenClient, setTokenClient] = useState(null);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);

  useEffect(() => {
    const script1 = document.createElement('script');

    script1.src = 'https://apis.google.com/js/api.js';
    script1.async = true;
    script1.defer = true;

    script1.onload = () => {
      // This function will be called when the script is loaded.
      gapiLoaded();
    };

    document.body.appendChild(script1);

    const script2 = document.createElement('script');

    script2.src = 'https://accounts.google.com/gsi/client';
    script2.async = true;
    script2.defer = true;

    script2.onload = () => {
      // This function will be called when the script is loaded.
      gisLoaded();
    };

    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  const initializeGapiClient = useCallback(async () => {
    await (window as any).gapi.client.init({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      discoveryDocs: ['https://docs.googleapis.com/$discovery/rest?version=v1'],
    });
    setGapiInited(true);
  }, []);

  /**
   * Callback after api.js is loaded.
   */
  const gapiLoaded = useCallback(() => {
    (window as any).gapi.load('client', initializeGapiClient);
  }, [initializeGapiClient]);

  /**
   * Callback after Google Identity Services are loaded.
   */
  const gisLoaded = useCallback(() => {
    setTokenClient(
      (window as any).google.accounts.oauth2.initTokenClient({
        client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
        scope: 'https://www.googleapis.com/auth/documents',
        callback: '', // defined later
      }),
    );
    setGisInited(true);
  }, []);

  const googleApiContextData = useMemo(
    () => ({
      tokenClient,
      loaded: gapiInited && gisInited,
    }),
    [tokenClient, gapiInited, gisInited],
  );

  return (
    <BrowserRouter>
      <GoogleApiContext.Provider value={googleApiContextData}>
        <ThemeProvider theme={theme}>
          <AppWrapper data-testid="app">
            <Helmet
              defaultTitle={name}
              defer={false}
              encodeSpecialCharacters
              htmlAttributes={{ lang: 'en-US' }}
              titleAttributes={{ itemprop: 'name', lang: 'en-US' }}
              titleTemplate={`%s | ${name}`}
            >
              <link
                href="https://fonts.googleapis.com/css2?family=Lemon:wght@400&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
                rel="stylesheet"
              />
            </Helmet>
            {isAuthenticated && <Header />}
            <Main isAuthenticated={isAuthenticated}>
              <Routes>
                <Route
                  element={
                    <PublicRoute isAuthenticated={isAuthenticated} to="/private">
                      <Home />
                    </PublicRoute>
                  }
                  path="/"
                />
                <Route
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated} to="/">
                      <Private />
                    </PrivateRoute>
                  }
                  path="/private"
                />
                <Route element={<NotFound />} path="*" />
              </Routes>
            </Main>
            {/* <Footer /> */}
            <SystemAlerts />
          </AppWrapper>
        </ThemeProvider>
      </GoogleApiContext.Provider>
    </BrowserRouter>
  );
}

export default Root;
