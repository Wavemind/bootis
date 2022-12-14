/**
 * The external imports
 */
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Button,
} from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'

/**
 * The internal imports
 */
import { Page } from '../components'

const Planning = () => {
  const { t } = useTranslation('common')

  return (
    <Page title='Planning' description='Planning'>
      <HStack bg='blue' py={2} px={4} borderRadius='xl' spacing={6}>
        <Box bg='white' borderRadius='full' flex={1} h='full' />
        <Button>Categories</Button>
      </HStack>
      <Box position='relative' w='full' h='full' my={2}>
        <Accordion
          allowToggle
          w='full'
          bg='black'
          color='white'
          borderRadius='xl'
        >
          <AccordionItem borderRadius='xl'>
            <AccordionButton>
              <HStack>
                <CalendarIcon h={6} w={6} />
                <Box border='1px solid white' px={10} py={1} borderRadius='lg'>
                  27.03.2023
                </Box>
                <Box border='1px solid white' px={10} py={1} borderRadius='lg'>
                  28.03.2023
                </Box>
                <Box border='1px solid white' px={10} py={1} borderRadius='lg'>
                  29.03.2023
                </Box>
                <Box border='1px solid white' px={10} py={1} borderRadius='lg'>
                  30.03.2023
                </Box>
              </HStack>
            </AccordionButton>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
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

export default Planning
