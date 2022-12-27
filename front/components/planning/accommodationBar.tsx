/**
 * The external imports
 */
import { FC } from 'react'
import { HStack, Icon, Text } from '@chakra-ui/react'
import { FaBed } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'

/**
 * Type imports
 */
import { ISlot } from '../../lib/types'

/**
 * Type definitions
 */
interface IAccommodationBarProps {
  accommodationData: ISlot
}

const AccommodationBar: FC<IAccommodationBarProps> = ({
  accommodationData,
}) => {
  /**
   * Handle edit action for the accommodation
   */
  const handleEdit = () => {
    console.log('edit the hotel')
  }

  // TODO : Get data from backend
  return (
    <HStack w='full' bg='teal' borderRadius='lg' p={3} spacing={8}>
      <Icon as={FaBed} color='white' h={6} w={6} />
      <Text color='white' fontFamily='Noir Pro Medium, sans-serif'>
        {accommodationData.name}
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
