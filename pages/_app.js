import React from 'react'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { Router } from 'next/router'
import Layout from '../components/Layout'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import createEmotionCache from '../utils/createEmotionCache'
import theme from '../styles/theme'
import 'nprogress/nprogress.css'
import 'react-day-picker/dist/style.css'
import 'react-image-lightbox/style.css'
import '@mdi/font/css/materialdesignicons.min.css'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from '../context/AuthContext'

const clientSideEmotionCache = createEmotionCache()

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {}
  console.debug = () => {}
  console.info = () => {}
  console.warn = () => {}
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  NProgress.configure({ showSpinner: false })

  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <AnimatePresence exitBeforeEnters>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              {typeof window !== 'undefined' ? (
                <PersistGate loading={null} persistor={persistor}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </PersistGate>
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </AuthProvider>
            <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ThemeProvider>
        </CacheProvider>
      </AnimatePresence>
    </Provider>
  )
}

export default MyApp
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
