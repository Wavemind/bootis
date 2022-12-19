/**
 * The external imports
 */
import { FC } from 'react'
import { Box, VStack, Icon, Text, Button } from '@chakra-ui/react'
import { GrAddCircle } from 'react-icons/gr'

/**
 * The internal imports
 */
import { PlanningCard } from '../'

const PlanningDay: FC = () => {
  return (
    <VStack spacing={3}>
      <Text fontSize='xl' fontFamily='Noir Pro Medium, sans-serif'>
        29.03.2023
      </Text>
      <PlanningCard />
      <PlanningCard />
      <PlanningCard />
      <PlanningCard />
      <PlanningCard />
      <Box
        as={Button}
        w='full'
        border='1px solid black'
        borderRadius='lg'
        bg='white'
        py={7}
      >
        <Icon as={GrAddCircle} w={10} h={10} />
      </Box>
    </VStack>
  )
}

export default PlanningDay
