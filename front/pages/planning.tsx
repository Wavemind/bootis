/**
 * The external imports
 */
import { useMemo, useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  Box,
  HStack,
  VStack,
  SimpleGrid,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react'
import { Select, chakraComponents, ControlProps } from 'chakra-react-select'
import { BsCalendar3, BsSearch } from 'react-icons/bs'

/**
 * The internal imports
 */
import { Page, CategorySelection } from '../components'
import accommodationTypes from '../lib/config/accommodationTypes'
import restaurantTypes from '../lib/config/restaurantTypes'
import activities from '../lib/config/activities'

/**
 * Type definitions
 */
import { CategoryType, ElementType } from '../lib/types'

const Planning = () => {
  const { t } = useTranslation('planning')

  const [isPlanningOpen, setIsPlanningOpen] = useState(true)
  const [category, setCategory] = useState<CategoryType>({} as CategoryType)

  const categories = useMemo(
    () => [
      {
        key: 'accommodationTypes',
        label: t('categories.accommodations'),
        variant: 'teal',
        isMulti: false,
      },
      {
        key: 'restaurantTypes',
        label: t('categories.restaurants'),
        variant: 'salmon',
        isMulti: true,
      },
      {
        key: 'activities',
        label: t('categories.activities'),
        variant: 'turquoise',
        isMulti: true,
      },
    ],
    []
  )

  /**
   * Provide the correct elements to the select based on user category selection
   */
  const selectElements = useMemo(() => {
    if (!category.key) {
      return []
    }

    if (category.key === 'accommodationTypes') {
      return accommodationTypes
    } else if (category.key === 'restaurantTypes') {
      return restaurantTypes
    } else {
      return activities
    }
  }, [category])

  /**
   * Toggle the planning drawer
   */
  const togglePlanning = () => {
    setIsPlanningOpen(!isPlanningOpen)
  }

  /**
   * If data exists in localStorage, use it to prefill form values
   */
  useEffect(() => {
    if (localStorage.getItem('voyage') !== null) {
      const infoFromVoyage = JSON.parse(
        localStorage.getItem('voyage') as string
      )
      console.log(infoFromVoyage)
      // const defaultValues = {
      //   startDate: new Date(infoFromSearch.startDate),
      //   endDate: new Date(infoFromSearch.endDate),
      //   destination: regions.find(
      //     region => region.id === infoFromSearch.destination
      //   ),
      //   activities: [
      //     activities.find(activity => activity.id === infoFromSearch.activity),
      //   ],
      //   accommodation: '',
      //   restaurants: [],
      // }
    }
  }, [])

  // TODO : Content for cards ?
  // TODO : Content for planning ?
  // TODO : Regroup all propTypes somewhere in lib ?
  return (
    <Page title={t('title')} description={t('description')}>
      <HStack bg='blue' py={2} px={4} borderRadius='xl' spacing={6}>
        <Box w='full'>
          <Select
            closeMenuOnSelect={!category.isMulti}
            components={{
              Control: (props: ControlProps<ElementType>) => (
                <chakraComponents.Control {...props}>
                  <HStack w='full' ml={3}>
                    <Icon as={BsSearch} h={5} w={5} />
                    {props.children}
                  </HStack>
                </chakraComponents.Control>
              ),
            }}
            isMulti={category.isMulti}
            useBasicStyles
            options={selectElements}
            getOptionValue={(option: ElementType) => String(option.id)}
            chakraStyles={{
              option: (provided, { isSelected }) => ({
                ...provided,
                ...(isSelected && {
                  backgroundColor: 'blueLight',
                }),
              }),
              control: provided => ({
                ...provided,
                bg: 'white',
              }),
            }}
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
          <Flex
            as={motion.div}
            direction='column'
            position='absolute'
            bottom={0}
            bg='black'
            borderRadius='xl'
            color='white'
            w='full'
            flex={1}
            variants={{
              show: {
                top: 0,
                transition: { duration: 1.5, type: 'spring' },
              },
              hide: {
                top: '90%',
                transition: { duration: 1.5, type: 'spring' },
              },
            }}
            animate={isPlanningOpen ? 'show' : 'hide'}
          >
            <Flex h='full'>
              <Box role='button' onClick={togglePlanning} p={4}>
                <Icon as={BsCalendar3} h={8} w={8} />
              </Box>
              <Box w='full' flex={1} p={4} pb={4}>
                <HStack h='full'>
                  <Box
                    as={motion.div}
                    border='1px solid white'
                    h='full'
                    w={400}
                    // flex={1}
                    borderRadius='lg'
                    p={2}
                    overflowY='scroll'
                    variants={{
                      show: {
                        overflowY: 'scroll',
                        transition: { duration: 1 },
                      },
                      hide: {
                        overflowY: 'hidden',
                        transition: { duration: 0.5 },
                      },
                    }}
                    animate={isPlanningOpen ? 'show' : 'hide'}
                  >
                    <VStack spacing={2}>
                      <Text w='full' textAlign='center'>
                        27.10.1986
                      </Text>
                      <Box
                        as={motion.div}
                        w='full'
                        h={400}
                        borderRadius='lg'
                        variants={{
                          show: {
                            height: 400,
                            transition: { duration: 1 },
                          },
                          hide: {
                            height: 0,
                            transition: { duration: 0.5 },
                          },
                        }}
                        animate={isPlanningOpen ? 'show' : 'hide'}
                        bg='blue'
                      />
                      <Box
                        as={motion.div}
                        w='full'
                        h={400}
                        borderRadius='lg'
                        variants={{
                          show: {
                            height: 400,
                            transition: { duration: 1 },
                          },
                          hide: {
                            height: 0,
                            transition: { duration: 0.5 },
                          },
                        }}
                        animate={isPlanningOpen ? 'show' : 'hide'}
                        bg='blue'
                      />
                    </VStack>
                  </Box>
                </HStack>
              </Box>
            </Flex>
          </Flex>
        </AnimatePresence>
      </Flex>
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'planning',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default Planning
