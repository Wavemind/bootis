/**
 * The external imports
 */
import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

/**
 * The internal imports
 */
import { Link } from '../../components'
import Logo from '../../public/logo.svg'

const DefaultLayout = ({ children }) => {
  return (
    <Flex
      direction='column'
      maxW='1600px'
      h='100vh'
      maxH='100vh'
      margin='auto'
      py={4}
      px={4}
    >
      <Flex pb={4}>
        <Link href='/'>
          <Image src={Logo} alt='logo' height={42} width={42} />
        </Link>
      </Flex>
      <Flex flexDir='column' flex={1}>
        {children}
      </Flex>
    </Flex>
  )
}

export default DefaultLayout
