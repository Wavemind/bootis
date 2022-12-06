/**
 * The external imports
 */
import { ChakraProvider } from '@chakra-ui/react'

/**
 * The internal imports
 */
import theme from '/lib/theme'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
