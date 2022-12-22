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
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'

/**
 * The internal imports
 */
import { Page, Link, Search } from '../components'
import LogoFullWhite from '../public/logo-full-white.svg'
import WheelchairMale from '../public/wheelchair_male.svg'
import { AppDispatch, wrapper } from '../lib/store'
import { api } from '../lib/services/api'
import { getRegions } from '../lib/services/modules/region'
import { getActivityCategories } from '../lib/services/modules/category'

// TODO : Remplacer les textes par les trads une fois que le contenu est finalisé
const Home = () => {
  const { t } = useTranslation('home')

  return (
    <Page
      title={t('title', { ns: 'common' })}
      description={t('description', { ns: 'common' })}
    >
      <Grid
        templateAreas={`"about search search explanation"
                        "about profile questionnaire explanation"`}
        gridTemplateRows={'auto'}
        gridTemplateColumns={'28% 18% auto 13%'}
        gap={2}
        color='white'
      >
        <GridItem bg='salmon' area='about' borderRadius='xl'>
          <VStack pt={6} px={4} spacing={6} alignItems='flex-start'>
            <HStack justifyContent='space-between' w='full'>
              <Image
                src={LogoFullWhite}
                alt={t('logoAlt')}
                height={30}
                width={200}
              />
              <Text>{t('about')}</Text>
            </HStack>
            <Text fontSize='md'>
              Sit lacus tincidunt pulvinar eget nisi, purus id. Sem pharetra
              amet at egestas at. Scelerisque amet elit viverra rhoncus,
              condimentum. Felis, ullamcorper ornare accumsan ultricies dictum.
              At at lectus dolor neque.
            </Text>
            <Text fontSize='md'>
              Bienvenu sur le site de Bootis.ch! Nous sommes très heureux de
              vous voir ici. Chez Bootis nous offrons un système de
              planification de voyage en Suisse pour les personnes à mobilité
              réduite. Notre outil de planification fonctionne sur un système de
              drag-n-drop qui vous permet une planification simple et très
              complète.
            </Text>
            <Box>
              <Link href='#' color='yellow'>
                {t('learnMore')}
              </Link>
            </Box>
          </VStack>
          <Box
            mt={8}
            h={280}
            borderBottomRadius='xl'
            backgroundImage='/about-image.jpg'
            backgroundSize='cover'
          />
        </GridItem>
        <GridItem bg='blue' area='search' borderRadius='xl'>
          <VStack py={6} px={4} spacing={10} alignItems='flex-start'>
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
              <Heading variant='h1'>{t('profileHeader')}</Heading>
              <Text fontSize='xs'>{t('profile')}</Text>
            </HStack>
            <Text fontSize='xs'>
              Ut ullamcorper amet vitae augue magna facilisis consectetur
              molestie. Eget donec ultrices et cras justo, blandit amet purus
              vel. Sit quam egestas justo, suspendisse augue sit vulputate
              tellus. Aliquam tristique sit ultrices a leo. Ut ullamcorper amet.
            </Text>
            <Text fontSize='xs'>
              Consectetur molestie. Eget donec ultrices et cras justo, blandit
              amet purus vel. Sit quam egestas justo, suspendisse augue sit
              vulputate tellus. Aliquam tristique sit ultrices a leo.
            </Text>
          </VStack>
        </GridItem>
        <GridItem bg='teal' area='questionnaire' borderRadius='xl'>
          <VStack py={6} px={4} spacing={6} alignItems='flex-start' h='full'>
            <HStack justifyContent='space-between' w='full'>
              <Heading variant='h1'>{t('questionnaireHeader')}</Heading>
              <Text fontSize='xs'>{t('questionnaire')}</Text>
            </HStack>
            <HStack spacing={10} alignItems='flex-end' h='full'>
              <Image
                src={WheelchairMale}
                width={240}
                alt={t('wheelchairAlt')}
              />
              <VStack spacing={8} w='60%' alignItems='flex-start' h='full'>
                <Text fontSize='xs'>
                  Ut ullamcorper amet vitae augue magna facilisis consectetur
                  molestie. Eget donec ultrices et cras justo, blandit amet
                  purus vel. Sit quam egestas justo, suspendisse augue.
                </Text>
                <Text fontSize='xs'>
                  Facilisis consectetur molestie. Eget donec ultrices et cras
                  justo, blandit amet purus vel. Sit quam egestas justo,
                  suspendisse augue sit.
                </Text>
                <Text fontSize='xs'>
                  Leo facilisis consectetur molestie. Eget donec ultrices et
                  cras justo, blandit amet purus vel. Sit quam egestas justo,
                  suspendisse augue sit vulputate tellus. Aliquam tristique sit
                  ultrices a leo.
                </Text>
                <Box fontSize='xs'>
                  <Link href='/questionnaire'>{t('startQuestionnaire')}</Link>
                </Box>
              </VStack>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem bg='black' area='explanation' borderRadius='xl'>
          <VStack pt={6} px={4} spacing={6} alignItems='flex-start'>
            <Heading variant='h2'>{t('explanationHeader')}</Heading>
            <Text fontSize='xs'>
              Ut ullamcorper amet vitae augue magna facilisis consectetur
              molestie. Eget donec ultrices et cras justo, blandit amet purus
              vel. Sit quam egestas justo, suspendisse augue.
            </Text>
            <Text fontSize='xs'>
              Aliquam tristique sit ultrices a leo. Ut ullamcorper amet vitae
              augue magna facilisis consectetur molestie. Eget donec ultrices et
              cras justo, blandit amet purus. Sit vulputate tellus. Aliquam
              tristique sit ultrices a leo.
            </Text>
            <Text fontSize='xs'>
              Facilisis consectetur molestie. Eget donec ultrices et cras justo,
              blandit amet purus vel. Sit quam egestas justo, suspendisse augue
              sit vulputate tellus. Aliquam tristique sit ultrices a leo.
            </Text>
          </VStack>
        </GridItem>
      </Grid>
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
