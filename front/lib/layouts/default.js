/**
 * The external imports
 */
import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'

/**
 * The internal imports
 */
import { Link } from '/components'
import Logo from '/public/logo.svg'

const DefaultLayout = ({ children }) => {
  return (
    <Box w='full' minH='100vh' px={4}>
      <Flex direction='column' maxW='1600px' margin='auto'>
        <Flex py={4}>
          <Link href='/'>
            <Image src={Logo} alt='logo' height={42} width={42} />
          </Link>
        </Flex>
        <Box>{children}</Box>
      </Flex>
    </Box>
  )
}

export default DefaultLayout
