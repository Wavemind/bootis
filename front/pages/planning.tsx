/**
 * The external imports
 */
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  Box,
  HStack,
  SimpleGrid,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react'
import { CalendarIcon, PhoneIcon } from '@chakra-ui/icons'
import { Select, chakraComponents } from 'chakra-react-select'

/**
 * The internal imports
 */
import { Page, CategorySelection } from '../components'
import regions from '../lib/config/regions'

/**
 * Type definitions
 */
interface CategoryType {
  label?: string
  variant?: string
}

const Planning = () => {
  const { t } = useTranslation('planning')

  const [isPlanningOpen, setIsPlanningOpen] = useState(false)
  const [category, setCategory] = useState<CategoryType>({})

  const categories = useMemo(
    () => [
      { label: t('categories.hotels'), variant: 'teal' },
      { label: t('categories.restaurants'), variant: 'salmon' },
      { label: t('categories.activities'), variant: 'turquoise' },
    ],
    []
  )

  /**
   * Toggle the planning drawer
   */
  const togglePlanning = () => {
    setIsPlanningOpen(!isPlanningOpen)
  }

  const customComponents = {
    Input: ({ ...props }) => (
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <PhoneIcon color='gray.300' />
        </InputLeftElement>
        <chakraComponents.Input {...props} />
      </InputGroup>
    ),
  }

  // TODO : Search functionality => https://react-select.com/components
  // TODO : Content for cards ?
  // TODO : Content for planning ?
  // TODO : Regroup all propTypes somewhere in lib ?
  return (
    <Page title={t('title')} description={t('description')}>
      <HStack bg='blue' py={2} px={4} borderRadius='xl' spacing={6}>
        <Box w='full'>
          <Select
            closeMenuOnSelect={false}
            components={customComponents}
            isMulti
            useBasicStyles
            options={regions}
            getOptionValue={option => String(option.id)}
          />
        </Box>
        <CategorySelection
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </HStack>
      <Flex flexDir='column' my={2} gap={4} h='full' position='relative'>
        <Box position='absolute' top={0} bottom={0} w='full' overflowY='scroll'>
          <SimpleGrid columns={2} spacing={10}>
            <Box bg='tomato' height='200px'></Box>
            <Box bg='tomato' height='200px'></Box>
            <Box bg='tomato' height='200px'></Box>
            <Box bg='tomato' height='200px'></Box>
            <Box bg='tomato' height='200px'></Box>
            <Box bg='tomato' height='200px'></Box>
            <Box bg='tomato' height='200px'></Box>
          </SimpleGrid>
        </Box>
        <AnimatePresence>
          <Box
            as={motion.div}
            position='absolute'
            bottom={0}
            bg='black'
            borderRadius='xl'
            color='white'
            w='full'
            animate={{
              top: isPlanningOpen ? 0 : null,
              transition: { duration: 1.5, type: 'spring' },
            }}
          >
            <Box role='button' onClick={togglePlanning} p={4}>
              <CalendarIcon h={8} w={8} />
            </Box>
          </Box>
        </AnimatePresence>
      </Flex>
    </Page>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'planning'])),
      // Will be passed to the page component as props
    },
  }
}

export default Planning
