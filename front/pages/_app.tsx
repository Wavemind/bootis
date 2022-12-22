/**
 * The external imports
 */
import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

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

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>)

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <DefaultSeo {...SEO} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
