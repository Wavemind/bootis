/**
 * The external imports
 */
import React, { useState } from 'react'
import { HStack, Text, Box, Button } from '@chakra-ui/react'

/**
 * The internal imports
 */
import Calendar from './calendar'
import Select from './select'

const Search = () => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [destination, setDestination] = useState('')

  return (
    <HStack w='full' bg='white' borderRadius='full' color='black' p={1}>
      <HStack flex={1} justifyContent='space-between'>
        <Box flex={2} px={4}>
          <Select
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
          Activités
        </Box>
      </HStack>
      <Button variant='secondary'>Planifier</Button>
    </HStack>
  )
}

export default Search
