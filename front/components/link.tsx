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
  fontSize?: string
  target?: string
  fontFamily?: string
}

const Link: FC<LinkProps> = ({ children, href, ...rest }) => (
  <ChakraLink
    as={NextLink}
    href={href}
    style={{ textDecoration: 'none' }}
    {...rest}
  >
    {children}
  </ChakraLink>
)

export default Link
