/**
 * The external imports
 */
import React, { FC, useState } from 'react'
import { HStack, Text, Box, Button } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import addDays from 'date-fns/addDays'
import { CalendarDate } from '@uselessdev/datepicker'

/**
 * The internal imports
 */
import Calendar from './calendar'
import Select from './select'
import { useGetRegionsQuery } from '../../lib/services/modules/region'
import { useGetSectionsQuery } from '../../lib/services/modules/section'

/**
 * Type imports
 */
import { IEnumOption } from '../../lib/types'

const Search: FC = () => {
  const { t } = useTranslation('search')

  const [startDate, setStartDate] = useState<CalendarDate>(new Date())
  const [endDate, setEndDate] = useState<CalendarDate>(addDays(new Date(), 1))
  const [destination, setDestination] = useState<
    IEnumOption | undefined | null
  >()
  const [activity, setActivity] = useState<IEnumOption | undefined | null>()

  const { data: regions = [] } = useGetRegionsQuery()
  const { data: sections = [] } = useGetSectionsQuery()

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
            type='regions'
            options={regions}
            placeholder={
              <React.Fragment>
                <Text>{t('destinationTitle')}</Text>
                <Text fontSize='xs'>{t('destinationSubtitle')}</Text>
              </React.Fragment>
            }
            selected={destination as IEnumOption}
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
            type='activities'
            options={sections}
            placeholder={<Text>{t('activities')}</Text>}
            selected={activity as IEnumOption}
            setSelected={setActivity}
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
