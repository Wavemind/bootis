/**
 * The external imports
 */
import { FC } from 'react'
import { Flex, Grid, GridItem, Text, Button, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

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
    <Flex direction='column' maxW='1600px' margin='auto' p={4} minH='100vh'>
      <Flex pb={4} justifyContent='space-between' alignItems='center'>
        <Link href='/'>
          <Image src={Logo} alt='logo' height={42} width={42} />
        </Link>
        <HStack spacing={6}>
          <Link
            href='https://docs.google.com/forms/d/e/1FAIpQLSfeYKtHGTCy8l8ln95bdyXTes7wb048iTL41KiOxN3Jt8phVQ/viewform'
            target='_blank'
          >
            <Button variant='outline' size='sm' borderColor='black'>
              {t('opinion')}
            </Button>
          </Link>
        </HStack>
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
