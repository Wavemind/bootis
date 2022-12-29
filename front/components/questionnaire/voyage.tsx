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
import { useRouter } from 'next/router'

/**
 * The internal imports
 */
import Select from './select'
import DatePicker from './calendar'
import { QuestionnaireContext } from '../../lib/contexts'
import { useGetRegionsQuery } from '../../lib/services/modules/region'
import { useGetCuisineQuery } from '../../lib/services/modules/cuisine'
import {
  useGetActivityCategoriesQuery,
  useGetAccommodationCategoriesQuery,
  useLazyGetCategoriesByRegionQuery,
} from '../../lib/services/modules/category'
import { useLazyGetPlanningQuery } from '../../lib/services/modules/planning'

/**
 * Type imports
 */
import { IEnumOption, IFormValues } from '../../lib/types'

const Voyage: FC = () => {
  const { t } = useTranslation('voyage')
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const { steps, setSteps, currentStep } = useContext(QuestionnaireContext)

  const { data: regions = [] } = useGetRegionsQuery()
  const { data: cuisines = [] } = useGetCuisineQuery()
  const { data: activityCategories = [] } = useGetActivityCategoriesQuery()
  const { data: accommodationCategories = [] } =
    useGetAccommodationCategoriesQuery()

  const [
    getCategoriesByRegion,
    {
      data: categoriesByRegion = [],
      isFetching: isCatagoriesByRegionFetching,
      isSuccess: isCatagoriesByRegionSuccess,
    },
  ] = useLazyGetCategoriesByRegionQuery()

  const [
    getPlanning,
    {
      data: planning = {},
      isFetching: isPlanningFetching,
      isSuccess: isPlanningSuccess,
    },
  ] = useLazyGetPlanningQuery()

  const methods = useForm<IFormValues>({
    defaultValues: {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      destination: {} as IEnumOption,
      activities: [],
      accommodation: '',
      restaurants: [],
    },
  })

  /**
   * Fetches the available categories for the selected region
   */
  useEffect(() => {
    const destinationValue = methods.getValues('destination')
    if (destinationValue?.name) {
      getCategoriesByRegion(destinationValue.name)
    }
  }, [methods.watch('destination')])

  /**
   * Filters the available categories for the selected region
   */
  const filteredActivities = useMemo(() => {
    if (!isCatagoriesByRegionFetching && isCatagoriesByRegionSuccess) {
      return activityCategories.map(activity => ({
        ...activity,
        isDisabled: !categoriesByRegion.includes(activity.id),
      }))
    }
    return []
  }, [isCatagoriesByRegionSuccess, isCatagoriesByRegionFetching])

  /**
   * Updates the selected activities based on the availability in the selected region
   */
  useEffect(() => {
    if (!isCatagoriesByRegionFetching && isCatagoriesByRegionSuccess) {
      const selectedActivities = methods.getValues('activities')

      methods.setValue(
        'activities',
        selectedActivities?.filter(activity =>
          categoriesByRegion.includes(activity.id)
        )
      )
    }
  }, [isCatagoriesByRegionSuccess, isCatagoriesByRegionFetching])

  /**
   * Handles the data submission to the backend
   * @param data form data object
   */
  const onSubmit = (data: IFormValues) => {
    const newSteps = [...steps]
    newSteps[currentStep].formValues = data
    setSteps(newSteps)
    localStorage.setItem('steps', JSON.stringify(newSteps))
    getPlanning({
      startDate: data.startDate,
      endDate: data.endDate,
      region: data.destination?.name || '',
      categories: data.activities?.map(activity => activity.id) || [],
    })
  }

  /**
   * If the planning is properly received from the backend,
   * put it in localStorage and navigate to planning page
   */
  useEffect(() => {
    if (!isPlanningFetching && isPlanningSuccess) {
      localStorage.setItem('planning', JSON.stringify(planning))
      router.push('/planning')
    }
  }, [isPlanningSuccess, isPlanningFetching])

  /**
   * If data exists in localStorage, use it to prefill form values
   */
  useEffect(() => {
    if (localStorage.getItem('search') !== null) {
      const infoFromSearch = JSON.parse(
        localStorage.getItem('search') as string
      )
      const defaultValues: IFormValues = {
        startDate: infoFromSearch.startDate
          ? new Date(infoFromSearch.startDate)
          : new Date(),
        endDate: infoFromSearch.endDate
          ? new Date(infoFromSearch.endDate)
          : new Date(),
        accommodation: '',
        restaurants: [],
        destination: {} as IEnumOption,
        activities: [],
      }
      if (infoFromSearch.destination) {
        defaultValues.destination = regions.find(
          region => region.id === infoFromSearch.destination.id
        )
      }

      if (infoFromSearch.activity) {
        defaultValues.activities = [infoFromSearch.activity]
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
  // TODO : Get restaurant type info from somewhere
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
                  options={accommodationCategories}
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
                  options={cuisines}
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
