/**
 * The external imports
 */
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FormProvider, useForm } from 'react-hook-form'
import addDays from 'date-fns/addDays'
import {
  VStack,
  Box,
  Heading,
  Grid,
  GridItem,
  Button,
  HStack,
  Center,
  Spinner,
  Text,
  Icon,
} from '@chakra-ui/react'
import { BsInfoCircle } from 'react-icons/bs'

/**
 * The internal imports
 */
import { Page, Select, DatePicker } from '../components'
import regions from '../lib/config/regions'
import activities from '../lib/config/activities'
import accommodations from '../lib/config/accommodationTypes'
import restaurants from '../lib/config/restaurants'

/**
 * Type definitions
 */
type FormValues = {
  startDate: Date
  endDate: Date
  destination: string | { id: number; label: string; activities: number[] }
  activities: { id: number; label: string }[]
  accommodation: string | { id: number; label: string }
  restaurants: { id: number; label: string; activities: number[] }[]
}

const Voyage = () => {
  const { t } = useTranslation('voyage')
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const methods = useForm<FormValues>({
    defaultValues: {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      destination: '',
      activities: [],
      accommodation: '',
      restaurants: [],
    },
  })

  /**
   * Filters the available activities depending on the selected region
   */
  const filteredActivities = useMemo(() => {
    const destinationValue = methods.getValues('destination')
    if (typeof destinationValue === 'object') {
      return activities.map(activity => ({
        ...activity,
        isDisabled: !destinationValue.activities.includes(activity.id),
      }))
    }
    return activities
  }, [methods.watch('destination')])

  /**
   * Updates the selected activities based on the availability in the selected region
   */
  useEffect(() => {
    const destinationValue = methods.getValues('destination')
    if (typeof destinationValue === 'object') {
      const selectedActivities = methods.getValues('activities')
      methods.setValue(
        'activities',
        selectedActivities.filter(activity =>
          destinationValue.activities.includes(activity.id)
        )
      )
    }
  }, [methods.watch('destination')])

  /**
   * Handles the data submission to the backend
   * @param data form data object
   */
  // TODO : Connect to the backend I'm guessing ?
  const onSubmit = (data: FormValues) => {
    console.log(data)
    localStorage.setItem('voyage', JSON.stringify(data))
    router.push('/planning')
  }

  /**
   * If data exists in localStorage, use it to prefill form values
   */
  useEffect(() => {
    if (localStorage.getItem('search') !== null) {
      const infoFromSearch = JSON.parse(
        localStorage.getItem('search') as string
      )
      const defaultValues = {
        startDate: new Date(infoFromSearch.startDate),
        endDate: new Date(infoFromSearch.endDate),
        destination: regions.find(
          region => region.id === infoFromSearch.destination
        ),
        activities: [
          activities.find(activity => activity.id === infoFromSearch.activity),
        ],
        accommodation: '',
        restaurants: [],
      }

      methods.reset(defaultValues)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Center h='full'>
        <Spinner size='xl' color='salmon' thickness='4px' />
      </Center>
    )
  }

  return (
    <Page title={t('title')} description={t('description')}>
      <Box>
        <Heading variant='h1'>{t('header')}</Heading>
        <Heading variant='h3'>{t('subheader')}</Heading>
      </Box>
      <Box h='full' flex={1} pb={12} mt={10}>
        <VStack justifyContent='space-between' alignItems='flex-start' h='full'>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              id='voyage-form'
              style={{ width: '100%' }}
            >
              <Grid templateColumns='repeat(5, 1fr)' gap={10} mt={10}>
                <GridItem colSpan={2}>
                  <VStack spacing={8} alignItems='flex-start'>
                    <VStack alignItems='flex-start' spacing={4} w='20em'>
                      <DatePicker name='startDate' label={t('departure')} />
                    </VStack>

                    <Select
                      name='destination'
                      label={t('destination.label')}
                      subLabel={t('destination.subLabel')}
                      options={regions}
                      hasInfo
                      infoContent={
                        <VStack spacing={4}>
                          <Icon
                            as={BsInfoCircle}
                            w={30}
                            h={30}
                            color='salmon'
                          />
                          <Text
                            color='white'
                            textAlign='center'
                            fontFamily='Noir Pro Medium, sans-serif'
                          >
                            {t('destination.infoText')}
                          </Text>
                        </VStack>
                      }
                    />
                    <Select
                      name='accommodation'
                      label={t('accomodations.label')}
                      subLabel={t('accomodations.subLabel')}
                      options={accommodations}
                    />
                  </VStack>
                </GridItem>
                <GridItem colSpan={3}>
                  <VStack spacing={8} alignItems='flex-start'>
                    <VStack alignItems='flex-start' spacing={4} w='20em'>
                      <DatePicker name='endDate' label={t('return')} />
                    </VStack>
                    <Select
                      isMulti
                      name='activities'
                      label={t('activities.label')}
                      subLabel={t('activities.subLabel')}
                      options={filteredActivities}
                    />
                    <Select
                      isMulti
                      name='restaurants'
                      label={t('restaurants.label')}
                      subLabel={t('restaurants.subLabel')}
                      options={restaurants}
                    />
                  </VStack>
                </GridItem>
              </Grid>
            </form>
          </FormProvider>
          <HStack w='full' justifyContent='flex-end'>
            <Button variant='primary' type='submit' form='voyage-form'>
              {t('continue')}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'voyage'])),
      // Will be passed to the page component as props
    },
  }
}

export default Voyage
