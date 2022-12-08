/**
 * The external imports
 */
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

const Link = ({ children, href, ...rest }) => (
  <ChakraLink as={NextLink} href={href} {...rest}>
    {children}
  </ChakraLink>
)

export default Link
