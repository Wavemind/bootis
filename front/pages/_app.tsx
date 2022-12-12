/**
 * The external imports
 */
import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'

/**
 * The internal imports
 */
import theme from '../lib/theme'
import Fonts from '../lib/utils/fonts'
import Layout from '../lib/layouts/default'
import SEO from '../next-seo.config'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>)

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <DefaultSeo {...SEO} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}

export default appWithTranslation(MyApp)
