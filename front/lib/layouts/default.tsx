/**
 * The external imports
 */
import { FC } from 'react'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useTranslation, Trans } from 'next-i18next'

/**
 * The internal imports
 */
import { Link } from '../../components'
import Logo from '../../public/logo.svg'

/**
 * Type definitions
 */
import { IChildren } from '../types'

const DefaultLayout: FC<IChildren> = ({ children }) => {
  const { t } = useTranslation('common')

  return (
    <Flex direction='column' maxW='1600px' margin='auto' p={4} h='100vh'>
      <Flex pb={4}>
        <Link href='/'>
          <Image src={Logo} alt='logo' height={42} width={42} />
        </Link>
      </Flex>
      <Flex flexDir='column' flex={1} overflow='hidden'>
        {children}
      </Flex>
      <Grid w='full' alignItems='center' templateColumns='repeat(3, 1fr)' h={8}>
        <GridItem>
          <Text textAlign='left' fontSize='sm'>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </Text>
        </GridItem>
        <GridItem>
          <Flex justifyContent='center'>
            <Text textAlign='left' fontSize='sm'>
              {t('footer.contact')}
            </Text>
            &nbsp;
            <Link href='mailto: info@slowlution.ch' fontSize='sm'>
              info@slowlution.ch
            </Link>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex justifyContent='flex-end'>
            <Text textAlign='left' fontSize='sm'>
              {t('footer.wavemind')}
            </Text>
            &nbsp;
            <Link href='https://wavemind.ch' fontSize='sm' target='_blank'>
              wavemind.ch
            </Link>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default DefaultLayout
