/**
 * The external imports
 */
import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { hotjar } from 'react-hotjar'

/**
 * The internal imports
 */
import theme from '../lib/theme'
import Fonts from '../lib/utils/fonts'
import Layout from '../lib/layouts/default'
import SEO from '../next-seo.config'
import { wrapper } from '../lib/store'

/**
 * Type definitions
 */
type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  // Initialize Hotjar
  // TODO : Don't forget the env variables for hotjar
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.NEXT_PUBLIC_HOTJAR_ID),
      Number(process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION)
    )
  }, [])

  const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>)

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <DefaultSeo {...SEO} />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </Provider>
  )
}

export default appWithTranslation(MyApp)
