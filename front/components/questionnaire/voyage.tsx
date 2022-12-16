/**
 * The external imports
 */
import { FC, useEffect, useMemo, useState, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import addDays from 'date-fns/addDays'
import {
  VStack,
  Box,
  Grid,
  GridItem,
  Center,
  Spinner,
  Icon,
  Text,
} from '@chakra-ui/react'
import { BsInfoCircle } from 'react-icons/bs'

/**
 * The internal imports
 */
import Select from './select'
import DatePicker from './calendar'
import regions from '../../lib/config/regions'
import activities from '../../lib/config/activities'
import accommodations from '../../lib/config/accommodations'
import restaurants from '../../lib/config/restaurants'
import { QuestionnaireContext } from '../../lib/contexts'

/**
 * Type definitions
 */
import { VoyageFormValues } from '../../lib/types'

const Voyage: FC = () => {
  const { t } = useTranslation('voyage')

  const [loading, setLoading] = useState(true)

  const { steps, setSteps, currentStep } = useContext(QuestionnaireContext)

  const methods = useForm<VoyageFormValues>({
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

      if (selectedActivities && selectedActivities.length > 0) {
        methods.setValue(
          'activities',
          selectedActivities?.filter(activity =>
            destinationValue.activities.includes(activity.id)
          )
        )
      }
    }
  }, [methods.watch('destination')])

  /**
   * Handles the data submission to the backend
   * @param data form data object
   */
  // TODO : Connect to the backend I'm guessing ?
  const onSubmit = (data: VoyageFormValues) => {
    const newSteps = [...steps]
    newSteps[currentStep].formValues = data
    setSteps(newSteps)
    localStorage.setItem('steps', JSON.stringify(newSteps))
  }

  /**
   * If data exists in localStorage, use it to prefill form values
   */
  useEffect(() => {
    if (localStorage.getItem('search') !== null) {
      const infoFromSearch = JSON.parse(
        localStorage.getItem('search') as string
      )
      const defaultValues: VoyageFormValues = {
        startDate: infoFromSearch.startDate
          ? new Date(infoFromSearch.startDate)
          : new Date(),
        endDate: infoFromSearch.endDate
          ? new Date(infoFromSearch.endDate)
          : new Date(),
        accommodation: '',
        restaurants: [],
        destination: '',
        activities: [],
      }
      if (infoFromSearch.destination) {
        defaultValues.destination = regions.find(
          region => region.id === infoFromSearch.destination
        )
      }

      if (infoFromSearch.activity) {
        defaultValues.activities = [
          activities.find(
            activity => activity.id === infoFromSearch.activity
          ) as { id: number; label: string },
        ]
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

  // TODO : Check how to manage fonts => variants, defaults, etc.
  return (
    <Box w='full' h='full'>
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
                      <Icon as={BsInfoCircle} w={30} h={30} color='salmon' />
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
    </Box>
  )
}

export default Voyage
