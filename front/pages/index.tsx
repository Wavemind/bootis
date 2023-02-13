/**
 * The external imports
 */
import {
  Grid,
  GridItem,
  HStack,
  Text,
  Box,
  VStack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'

/**
 * The internal imports
 */
import { Page, Link, Search } from '../components'
import LogoFullWhite from '../public/logo-full-white.svg'
import LogoFullBlack from '../public/logo-full-black.svg'
import FooterImage from '../public/home-modal-footer.svg'
import WheelchairMale from '../public/wheelchair_male.svg'
import { AppDispatch, wrapper } from '../lib/store'
import { api } from '../lib/services/api'
import { getRegions } from '../lib/services/modules/region'
import { getActivityCategories } from '../lib/services/modules/category'
import { useEffect } from 'react'

const Home = () => {
  const { t } = useTranslation('home')

  const { isOpen, onOpen, onClose } = useDisclosure()

  /**
   * Opens the information modal
   */
  useEffect(() => {
    onOpen()
  }, [])

  return (
    <Page
      title={t('title', { ns: 'common' })}
      description={t('description', { ns: 'common' })}
    >
      <Grid
        templateAreas={`"about search search explanation"
                        "about profile questionnaire explanation"`}
        gridTemplateRows={'auto'}
        gridTemplateColumns={'28% 18% auto 14%'}
        gap={2}
        color='white'
        overflowY='hidden'
      >
        <GridItem
          bg='salmon'
          area='about'
          borderRadius='xl'
          display='flex'
          flexDir='column'
        >
          <VStack pt={6} px={4} spacing={6} alignItems='flex-start' flex={1}>
            <Image
              src={LogoFullWhite}
              alt={t('logoAlt')}
              height={30}
              width={200}
            />
            <Text fontSize='md'>{t('about.paragraph1')}</Text>
            <Text fontSize='md'>{t('about.paragraph2')}</Text>
          </VStack>
          <Box
            h={280}
            borderBottomRadius='xl'
            backgroundImage='/about-image.jpg'
            backgroundSize='cover'
          />
        </GridItem>
        <GridItem bg='blue' area='search' borderRadius='xl'>
          <VStack py={6} px={4} spacing={3} alignItems='flex-start'>
            <Heading variant='h2'>{t('searchHeader')}</Heading>
            <Text fontSize='md'>{t('searchText')}</Text>
            <Search />
          </VStack>
        </GridItem>
        <GridItem
          area='profile'
          borderRadius='xl'
          backgroundImage='/profile-background.jpg'
          backgroundSize='cover'
          backgroundPosition='center'
          backgroundRepeat='no-repeat'
        >
          <VStack
            py={6}
            px={4}
            spacing={6}
            bg='beigeOverlay'
            borderRadius='xl'
            h='full'
          >
            <HStack justifyContent='space-between' w='full'>
              <Heading variant='h1'>{t('profile.header')}</Heading>
            </HStack>
            <Text fontSize='md'>{t('profile.paragraph1')}</Text>
          </VStack>
        </GridItem>
        <GridItem bg='teal' area='questionnaire' borderRadius='xl'>
          <VStack py={6} px={4} spacing={6} alignItems='flex-start' h='full'>
            <HStack justifyContent='space-between' w='full'>
              <Heading variant='h1'>{t('questionnaire.header')}</Heading>
            </HStack>
            <VStack spacing={4} w='full' alignItems='flex-start' h='full'>
              <Text fontSize='md'>{t('questionnaire.paragraph1')}</Text>
              <HStack justifyContent='space-between' spacing={8}>
                <VStack alignItems='flex-start' spacing={8} w='65%'>
                  <Text fontSize='md'>{t('questionnaire.paragraph2')}</Text>
                  <Box fontSize='md'>
                    <Link href='/questionnaire'>
                      {t('questionnaire.start')}
                    </Link>
                  </Box>
                </VStack>
                <Image
                  src={WheelchairMale}
                  width={220}
                  alt={t('wheelchairAlt')}
                />
              </HStack>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem bg='black' area='explanation' borderRadius='xl'>
          <VStack pt={6} px={4} spacing={6} alignItems='flex-start'>
            <Heading variant='h2'>{t('explanation.header')}</Heading>
            <Text fontSize='sm'>
              <Trans
                i18nKey='explanation.paragraph1'
                t={t}
                components={{
                  l: (
                    <Link
                      href='mailto: info@slowlution.ch'
                      // Typescript
                      style={{ textDecoration: 'underline' }}
                    />
                  ),
                }}
              />
            </Text>
          </VStack>
        </GridItem>
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack alignItems='baseline' spacing={4} justifyContent='center'>
              <Text
                fontFamily='Noir Pro Medium, sans-serif'
                fontWeight='light'
                fontSize='xl'
              >
                {t('modal.welcome')}
              </Text>
              <Image src={LogoFullBlack} alt={t('logoAlt')} width={120} />
            </HStack>
          </ModalHeader>
          <ModalBody>
            <VStack spacing={8}>
              <Text
                fontFamily='Arial, sans-serif'
                textAlign='center'
                fontSize='md'
              >
                {t('modal.body')}
              </Text>
              <Button variant='primary' size='sm' onClick={onClose}>
                {t('modal.continue')}
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter px={0} pb={0}>
            <Box borderRadius='lg' overflow='hidden'>
              <Image src={FooterImage} alt={t('logoAlt')} />
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async ({ locale }) => {
    store.dispatch(getRegions.initiate() as AppDispatch)
    store.dispatch(getActivityCategories.initiate() as AppDispatch)
    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()))

    return {
      props: {
        ...(await serverSideTranslations(locale as string, [
          'common',
          'home',
          'search',
        ])),
        // Will be passed to the page component as props
      },
    }
  })

export default Home
