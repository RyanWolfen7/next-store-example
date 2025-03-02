import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import { persistor, store } from '../store/store'
import { Provider as ReduxProvider } from 'react-redux'
import '../styles/globals.scss'
import { PersistGate } from 'redux-persist/integration/react'
import NavAppBar from '../components/navigation/PrimaryNav'
import SystemMiddleWare from '../components/systemMiddleware'
import BreadCrumbs from '../components/breadcrumbs'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}) => {

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SystemMiddleWare>
                <NavAppBar />
                <BreadCrumbs />
                <Component {...pageProps} />
              </SystemMiddleWare>
            </PersistGate>
          </ReduxProvider>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
}
