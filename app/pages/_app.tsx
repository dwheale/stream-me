import React, { useEffect, FC } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles'
import { themeDark, themeLight } from 'lib/theme';
import { NextComponentType } from 'next';

type AppProps = {
  Component: NextComponentType;
  pageProps: any;
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove server-side injected css
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={pageProps?.useLightTheme ? themeLight : themeDark}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
