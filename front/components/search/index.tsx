/**
 * The external imports
 */
import React, { useState } from 'react'
import { HStack, Text, Box, Button, useConst } from '@chakra-ui/react'

/**
 * The internal imports
 */
import Calendar from './calendar'
import Select from './select'

const Search = () => {
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
      <HStack flex={1} justifyContent='space-between'>
        <Box flex={2} px={4}>
          <Select
            options={regions}
            placeholder={
              <React.Fragment>
                <Text>Destination</Text>
                <Text fontSize='xs'>Ou souhaitez-vous aller ?</Text>
              </React.Fragment>
            }
            selected={destination}
            setSelected={setDestination}
          />
        </Box>
        <Box flex={1} py={2} px={4} borderLeft='1px solid black'>
          <Calendar
            placeholder='Date de départ'
            date={startDate}
            setDate={setStartDate}
          />
        </Box>
        <Box flex={1} py={2} px={4} borderLeft='1px solid black'>
          <Calendar
            placeholder="Date d'arrivée"
            date={endDate}
            setDate={setEndDate}
          />
        </Box>
        <Box py={2} px={6} borderLeft='1px solid black'>
          <Select
            options={activities}
            placeholder={<Text>Activités</Text>}
            selected={activity}
            setSelected={setActivity}
          />
        </Box>
      </HStack>
      <Button variant='salmon'>Planifier</Button>
    </HStack>
  )
}

export default Search
