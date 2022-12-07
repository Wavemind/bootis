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
  Center,
  Heading,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
// TODO : Remove this when no longer needed
import { loremIpsum } from 'react-lorem-ipsum'

/**
 * The internal imports
 */
import { Page, Link } from '../components'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <Page title={t('title')} description={t('description')}>
      <Grid
        templateAreas={`"about search search explanation"
                        "about profile questionnaire explanation"`}
        gridTemplateRows={'auto'}
        gridTemplateColumns={'35% 17% auto 12%'}
        gap={2}
        color='white'
      >
        <GridItem bg='secondary' area='about' borderRadius='xl'>
          <VStack pt={6} px={4} spacing={6} alignItems='flex-start'>
            <HStack justifyContent='space-between' w='full'>
              <Image
                src='/logo-full-white.svg'
                alt='logo'
                height={30}
                width={200}
              />
              <Text>About</Text>
            </HStack>
            <Text fontSize='md'>{loremIpsum()}</Text>
            <Text fontSize='md'>{loremIpsum()}</Text>
            <Box>
              <Link href='#'>{'En savoir plus >'}</Link>
            </Box>
          </VStack>
          <Center mt={8} h={280} w='full' bg='blue' borderBottomRadius='xl'>
            Image
          </Center>
        </GridItem>
        <GridItem bg='primary' area='search' borderRadius='xl'>
          <VStack pt={6} px={4} spacing={10} alignItems='flex-start'>
            <Heading variant='h2'>Planifiez votre voyage en Suisse</Heading>
            <Text fontSize='md'>
              Après avoir rempli ces informations, il vous faudra répondre à une
              série de questions vous concernant.
            </Text>
            <Center
              w='full'
              h={16}
              bg='white'
              borderRadius='full'
              color='black'
            >
              Search
            </Center>
          </VStack>
        </GridItem>
        <GridItem bg='fourth' area='profile' borderRadius='xl'>
          <VStack pt={6} px={4} spacing={6} alignItems='flex-start'>
            <HStack justifyContent='space-between' w='full'>
              <Heading variant='h1'>Pour qui ?</Heading>
              <Text fontSize='xs'>Profile</Text>
            </HStack>
            <Text fontSize='xs'>{loremIpsum()}</Text>
            <Text fontSize='xs'>{loremIpsum()}</Text>
          </VStack>
        </GridItem>
        <GridItem bg='third' area='questionnaire' borderRadius='xl'>
          <VStack pt={6} px={4} spacing={6} alignItems='flex-start'>
            <HStack justifyContent='space-between' w='full'>
              <Heading variant='h1'>Création de votre profil</Heading>
              <Text fontSize='xs'>Questionnaire</Text>
            </HStack>
            <HStack spacing={4}>
              <Center h={280} w='300px' bg='blue' borderRadius='xl'>
                Image
              </Center>
              <Box w='60%'>
                <Text fontSize='xs'>{loremIpsum()}</Text>
                <Text fontSize='xs'>{loremIpsum()}</Text>
              </Box>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem bg='black' area='explanation' borderRadius='xl'>
          <VStack pt={6} px={4} spacing={6} alignItems='flex-start'>
            <Heading variant='h2'>Bootis comment ça marche ?</Heading>
            <Text fontSize='xs'>{loremIpsum()}</Text>
            <Text fontSize='xs'>{loremIpsum()}</Text>
          </VStack>
        </GridItem>
      </Grid>
    </Page>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
