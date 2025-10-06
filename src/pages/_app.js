import { useState } from 'react';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import TopBarProgress from 'react-topbar-progress-indicator';
import { SWRConfig } from 'swr';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

import progressBarConfig from '@/config/progress-bar/index';
import swrConfig from '@/config/swr/index';
import WorkspaceProvider from '@/providers/workspace';

import '@/styles/globals.css';
let rawdata = require('../messages/en.json');

let langCode = 'en';
let langObject = {};
langObject[langCode] = {};

langObject[langCode].translation = rawdata;
i18n.use(initReactI18next).init({
  resources: langObject,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const App = ({ Component, pageProps }) => {
  const [progress, setProgress] = useState(false);
  const { t } = useTranslation();
  const swrOptions = swrConfig();

  Router.events.on('routeChangeStart', () => setProgress(true));
  Router.events.on('routeChangeComplete', () => setProgress(false));
  TopBarProgress.config(progressBarConfig());

  return (
    <SWRConfig value={swrOptions}>
      <ThemeProvider attribute="class">
        <WorkspaceProvider>
          {progress && <TopBarProgress />}
          <Component {...pageProps} />
        </WorkspaceProvider>
      </ThemeProvider>
    </SWRConfig>
  );
};

export default App;
