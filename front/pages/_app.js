/**
 * The external imports
 */
import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import theme from '/lib/theme'
import Layout from '/lib/layouts/default'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>)

  return (
    <ChakraProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}

export default appWithTranslation(MyApp)
