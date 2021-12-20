import { AppContext, AppProps } from 'next/app';
import theme from '../styles/theme';
import { useEffect } from 'react';
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import { KEYCLOAK_PUBLIC_CONFIG } from '../utils/auth';
import { parseCookies } from '../utils/cookies';
import { ThemeProvider } from '@material-ui/styles';
import { Container, CssBaseline } from '@material-ui/core';

interface MyAppProps extends AppProps {
  cookies: any;
}

function MyApp({ Component, pageProps, cookies }: MyAppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
      <SSRKeycloakProvider
        persistor={SSRCookies(cookies)}
        keycloakConfig={KEYCLOAK_PUBLIC_CONFIG}
        initOptions={{
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: typeof window !== 'undefined' ? `${window.location.origin}/silent-check-sso.html` : null,
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Container style={{ paddingTop: theme.spacing(2) }}>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </SSRKeycloakProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    cookies: parseCookies(appContext.ctx.req),
  };
};

export default MyApp;
