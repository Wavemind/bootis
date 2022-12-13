/**
 * The external imports
 */
import React, { useMemo, useState } from 'react'
import { HStack, Text, Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

/**
 * The internal imports
 */
import Calendar from './calendar'
import Select from './select'
import regions from '../../lib/config/regions'
import activities from '../../lib/config/activities'

const Search = () => {
  const { t } = useTranslation('search')

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [destination, setDestination] = useState()
  const [activity, setActivity] = useState()

  /**
   * Flags the unavailable activities for the selected destination
   */
  const availableActivities = useMemo(() => {
    if (destination) {
      const destinationObject = regions.find(
        region => region.id === destination
      )
      setActivity(null)
      return activities.map(activity => ({
        ...activity,
        unavailable: !destinationObject.activities.includes(activity.id),
      }))
    }
    return activities
  }, [destination])

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
            selected={destination}
            setSelected={setDestination}
          />
        </Box>
        <Box w='20%' py={2} px={4} borderLeft='1px solid black'>
          <Calendar
            placeholder={t('departureDate')}
            date={startDate}
            setDate={setStartDate}
          />
        </Box>
        <Box w='20%' py={2} px={4} borderLeft='1px solid black'>
          <Calendar
            placeholder={t('returnDate')}
            date={endDate}
            setDate={setEndDate}
          />
        </Box>
        <Box w='150px' py={2} px={6} borderLeft='1px solid black'>
          <Select
            options={availableActivities}
            placeholder={<Text>{t('activities')}</Text>}
            selected={activity}
            setSelected={setActivity}
          />
        </Box>
      </HStack>
      <Link href='/voyage'>
        <Button variant='salmon' onClick={saveSearch}>
          {t('plan')}
        </Button>
      </Link>
    </HStack>
  )
}

export default Search
