/**
 * The external imports
 */
import { FC } from 'react'
import { Box, Center, HStack, Text, Icon } from '@chakra-ui/react'
import { BsPinMap } from 'react-icons/bs'

const PlanningCard: FC = () => {
  return (
    <Box w={316} borderRadius='lg' bg='white' boxShadow='lg'>
      <Center
        h={75}
        bg='grey'
        borderRadius='lg'
        color='black'
        position='relative'
      >
        <Box
          position='absolute'
          top={0}
          left={0}
          bg='teal'
          py={1}
          px={2}
          color='white'
          borderTopLeftRadius='lg'
          borderBottomRightRadius='lg'
          fontSize='xs'
        >
          Activité
        </Box>
        Image
      </Center>
      <Box p={2}>
        <Text color='black' fontWeight='bold' my={2}>
          {"Bibliothèque d'art et d'archéologie"}
        </Text>
        <HStack>
          <Icon as={BsPinMap} color='black' h={4} w={4} />
          <Text color='black' fontSize='xs'>
            Promenade du Pin 5, 1204 Genève
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default PlanningCard
