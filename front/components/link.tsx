/**
 * The external imports
 */
import { FC } from 'react'
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

/**
 * Type definitions
 */
interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
}

const Link: FC<LinkProps> = ({ children, href, ...rest }) => (
  <ChakraLink as={NextLink} href={href} {...rest}>
    {children}
  </ChakraLink>
)

export default Link
