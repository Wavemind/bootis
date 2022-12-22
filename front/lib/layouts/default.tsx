/**
 * The external imports
 */
import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

/**
 * The internal imports
 */
import { Link } from '../../components'
import Logo from '../../public/logo.svg'

/**
 * Type definitions
 */
import { IChildren } from '../types'

const DefaultLayout: FC<IChildren> = ({ children }) => (
  <Flex
    direction='column'
    maxW='1600px'
    maxH='calc(100vh)'
    h='calc(100vh)'
    margin='auto'
    p={4}
  >
    <Flex pb={4}>
      <Link href='/'>
        <Image src={Logo} alt='logo' height={42} width={42} />
      </Link>
    </Flex>
    <Flex flexDir='column' flex={1} overflow='hidden'>
      {children}
    </Flex>
  </Flex>
)

export default DefaultLayout
