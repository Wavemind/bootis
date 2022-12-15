/**
 * The external imports
 */
import React, { FC } from 'react'
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

/**
 * Type definitions
 */
type LinkProps = {
  children: React.ReactNode
  href: string
  [x: string]: any
}

const Link: FC<LinkProps> = ({ children, href, ...rest }) => (
  <ChakraLink as={NextLink} href={href} {...rest}>
    {children}
  </ChakraLink>
)

export default Link
