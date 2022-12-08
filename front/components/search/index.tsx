/**
 * The external imports
 */
import React, { useState } from 'react'
import { HStack, Text, Box, Button, useConst } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import Calendar from './calendar'
import Select from './select'

const Search = () => {
  const { t } = useTranslation('search')

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [destination, setDestination] = useState('')
  const [activity, setActivity] = useState('')

  // TODO : Get this from backend I'm guessing ?
  const regions = useConst(() => [
    'Grisons',
    'Suisse orientiale',
    'Région zurichoise',
    'Lucerne / Lac des Quarte-Cantons',
    'Région bâloise',
    'Région Berne',
    'Jura & Trois-Lacs',
    'Vaud',
    'Genève',
    'Valaise',
    'Tessin',
    'Région Fribourg',
    'Région Argovie et Soleure',
  ])

  // TODO : Get this from backend I'm guessing ?
  const activities = useConst(() => [
    'Shopping',
    'Cinéma, théâtre, concert, opéra',
    'Musées et galeries',
    'Jardins botaniques et parcs',
    'Zoo',
    'Sport',
    'Oenotourisme',
    'Spa et centre thermal',
  ])

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
            options={activities}
            placeholder={<Text>{t('activities')}</Text>}
            selected={activity}
            setSelected={setActivity}
          />
        </Box>
      </HStack>
      <Button variant='salmon'>{t('plan')}</Button>
    </HStack>
  )
}

export default Search
