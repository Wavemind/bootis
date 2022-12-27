/**
 * The external imports
 */
import { FC } from 'react'
import { Box, HStack, Icon, VStack, Text, Center } from '@chakra-ui/react'
import { MdOutlineLocationOn } from 'react-icons/md'

const SelectionElement: FC = () => {
  /**
   * Handles the new element selection
   */
  const handleSelection = () => {
    console.log('replace the selected slot with the selected new element')
  }

  // TODO : Get data from backend
  return (
    <Box
      role='button'
      h='fit-content'
      boxShadow='xl'
      borderRadius='lg'
      borderTopStyle='solid'
      borderTopColor='salmon'
      borderTopWidth={12}
      onClick={handleSelection}
    >
      <Center h={194} bg='grey' borderBottomRadius='lg'>
        Image
      </Center>
      <VStack alignItems='flex-start' p={2} pb={4} spacing={3}>
        <Text fontSize='xl' fontFamily='Noir Pro Medium, sans-serif'>
          Lausanne-Moudon
        </Text>
        <HStack>
          <Icon as={MdOutlineLocationOn} h={7} w={7} />
          <Text fontSize='sm' w='80%' lineHeight={1.2}>
            Rue du Tunnel-bourg 20, 1005 Lausanne
          </Text>
        </HStack>
        <HStack my={2} spacing={2}>
          <Box bg='blue' h={22} w={22} borderRadius='sm' />
          <Box bg='blue' h={22} w={22} borderRadius='sm' />
          <Box bg='blue' h={22} w={22} borderRadius='sm' />
          <Box bg='blue' h={22} w={22} borderRadius='sm' />
        </HStack>
      </VStack>
    </Box>
  )
}

export default SelectionElement
