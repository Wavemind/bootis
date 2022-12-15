/**
 * The external imports
 */
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

/**
 * Type definitions
 */
interface LinkPropTypes {
  children: React.ReactNode
  href: string
  [x: string]: any
}

const Link = (props: LinkPropTypes) => {
  const { children, href, ...rest } = props

  return (
    <ChakraLink as={NextLink} href={href} {...rest}>
      {children}
    </ChakraLink>
  )
}

export default Link
