/**
 * The external imports
 */
import React, { FC, useMemo, useState } from 'react'
import { HStack, Text, Box, Button, useConst } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import addDays from 'date-fns/addDays'

/**
 * The internal imports
 */
import Calendar from './calendar'
import Select from './select'
import { CalendarDate } from '@uselessdev/datepicker'

const Search: FC = () => {
  const { t } = useTranslation('search')

  const [startDate, setStartDate] = useState<CalendarDate>(new Date())
  const [endDate, setEndDate] = useState<CalendarDate>(addDays(new Date(), 1))
  const [destination, setDestination] = useState<number | undefined | null>()
  const [activity, setActivity] = useState<number | undefined | null>()

  // TODO : Get this from backend I'm guessing ?
  const regions = useConst(() => [
    { id: 1, label: 'Grisons', activities: [1, 2, 3, 4, 5, 6, 7, 8] },
    { id: 2, label: 'Suisse orientiale', activities: [2, 4, 5] },
    { id: 3, label: 'Région zurichoise', activities: [1, 2, 3] },
    { id: 4, label: 'Lucerne / Lac des Quarte-Cantons', activities: [4, 6, 8] },
    { id: 5, label: 'Région bâloise', activities: [6, 7, 8] },
    { id: 6, label: 'Région Berne', activities: [1, 2, 3, 4, 5] },
    { id: 7, label: 'Jura & Trois-Lacs', activities: [] },
    { id: 8, label: 'Vaud', activities: [2, 3, 4, 5, 6] },
    { id: 9, label: 'Genève', activities: [1, 8] },
    { id: 10, label: 'Valaise', activities: [2, 7] },
    { id: 11, label: 'Tessin', activities: [3, 4] },
    { id: 12, label: 'Région Fribourg', activities: [6, 7] },
    { id: 13, label: 'Région Argovie et Soleure', activities: [1, 3, 5, 8] },
  ])

  // TODO : Get this from backend I'm guessing ?
  const activities = useConst(() => [
    { id: 1, label: 'Shopping' },
    { id: 2, label: 'Cinéma, théâtre, concert, opéra' },
    { id: 3, label: 'Musées et galeries' },
    { id: 4, label: 'Jardins botaniques et parcs' },
    { id: 5, label: 'Zoo' },
    { id: 6, label: 'Sport' },
    { id: 7, label: 'Oenotourisme' },
    { id: 8, label: 'Spa et centre thermal' },
  ])

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
        unavailable: !destinationObject?.activities.includes(activity.id),
      }))
    }
    return activities
  }, [destination])

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
            selected={destination as number}
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
            selected={activity as number}
            setSelected={setActivity}
          />
        </Box>
      </HStack>
      <Button variant='salmon'>{t('plan')}</Button>
    </HStack>
  )
}

export default Search
