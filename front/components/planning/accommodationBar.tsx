/**
 * The external imports
 */
import { FC } from 'react'
import { HStack, Icon, Text } from '@chakra-ui/react'
import { FaBed } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'

const AccommodationBar: FC = () => {
  /**
   * Handle edit action for the accommodation
   */
  const handleEdit = () => {
    console.log('edit the hotel')
  }

  return (
    <HStack w='full' bg='teal' borderRadius='lg' p={3} spacing={8}>
      <Icon as={FaBed} color='white' h={6} w={6} />
      <Text color='white' fontFamily='Noir Pro Medium, sans-serif'>
        Hôtel du Lac, Lausanne
      </Text>
      <Text color='white' fontFamily='Noir Pro Medium, sans-serif'>
        28.03.2023 - 31.03.2023
      </Text>
      <Icon
        role='button'
        as={MdEdit}
        color='white'
        h={6}
        w={6}
        onClick={handleEdit}
      />
    </HStack>
  )
}

export default AccommodationBar
