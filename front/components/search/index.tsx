/**
 * The external imports
 */
import React, { FC, useEffect, useState, useMemo } from 'react'
import { HStack, Text, Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import addDays from 'date-fns/addDays'
import differenceInDays from 'date-fns/differenceInDays'
import { CalendarDate } from '@uselessdev/datepicker'

/**
 * The internal imports
 */
import Calendar from './calendar'
import Select from './select'
import { useGetRegionsQuery } from '../../lib/services/modules/region'
import {
  useGetActivityCategoriesQuery,
  useLazyGetCategoriesByRegionQuery,
} from '../../lib/services/modules/category'

/**
 * Type imports
 */
import { IEnumOption } from '../../lib/types'

const Search: FC = () => {
  const { t } = useTranslation('search')

  const [startDate, setStartDate] = useState<CalendarDate>(new Date())
  const [endDate, setEndDate] = useState<CalendarDate>(addDays(new Date(), 2))
  const [destination, setDestination] = useState<IEnumOption>({} as IEnumOption)
  const [activity, setActivity] = useState<IEnumOption>({} as IEnumOption)

  const { data: regions = [] } = useGetRegionsQuery()
  const { data: activityCategories = [] } = useGetActivityCategoriesQuery()

  const [getCategoriesByRegion, { data: categoriesByRegion = [], isSuccess }] =
    useLazyGetCategoriesByRegionQuery()

  /**
   * Updates the endDate if the startDate is on the same
   * day as the previously selected endDate
   */
  useEffect(() => {
    if (differenceInDays(endDate, startDate) < 1) {
      setEndDate(addDays(startDate, 1))
    }
  }, [startDate])

  /**
   * Fetches the available categories for the selected region
   */
  useEffect(() => {
    if (destination) {
      getCategoriesByRegion(destination.name)
    }
  }, [destination])

  /**
   * Marks activities as unavailable if unavailable in the selected region
   */
  const filteredActivities = useMemo(() => {
    if (isSuccess) {
      return activityCategories.map(category => {
        if (!categoriesByRegion.includes(category.id)) {
          return {
            ...category,
            unavailable: true,
          }
        }
        return category
      })
    }
    return []
  }, [categoriesByRegion, isSuccess])

  /**
   * Saves the search values to localStorage and routes to the questionnaire
   */
  const saveSearch = () => {
    localStorage.setItem(
      'search',
      JSON.stringify({ startDate, endDate, destination, activity })
    )
  }

  return (
    <HStack w='full' bg='white' borderRadius='full' color='black' p={1}>
      <HStack
        display='flex'
        flex={1}
        justifyContent='space-between'
        spacing={0}
      >
        <Box w='40%' px={4}>
          <Select
            options={regions}
            placeholder={
              <React.Fragment>
                <Text>{t('destinationTitle')}</Text>
                <Text fontSize='xs'>{t('destinationSubtitle')}</Text>
              </React.Fragment>
            }
            selected={destination as IEnumOption}
            setSelected={setDestination}
            emptyMessage={t('emptyDestination')}
          />
        </Box>
        <HStack
          w='40%'
          py={2}
          px={4}
          borderLeft='1px solid black'
          justifyContent='space-between'
        >
          <Text>{t('from')}</Text>
          <Calendar date={startDate} setDate={setStartDate} />
          <Text>{t('au')}</Text>
          <Calendar
            date={endDate}
            setDate={setEndDate}
            disabledBefore={addDays(startDate, 1)}
          />
        </HStack>
        <Box w='150px' py={2} px={6} borderLeft='1px solid black'>
          <Select
            options={filteredActivities as IEnumOption[]}
            placeholder={<Text>{t('activities')}</Text>}
            selected={activity as IEnumOption}
            setSelected={setActivity}
            labelKey='name'
            emptyMessage={t('selectDestination')}
          />
        </Box>
      </HStack>
      <Link href='/questionnaire'>
        <Button variant='salmon' onClick={saveSearch}>
          {t('plan')}
        </Button>
      </Link>
    </HStack>
  )
}

export default Search
