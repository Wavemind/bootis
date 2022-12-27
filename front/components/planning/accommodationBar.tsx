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
import format from 'date-fns/format'

/**
 * Type definitions
 */
interface IAccommodationBarProps {
  accommodationData: ISlot
  startDate: Date
  endDate: Date
}

const AccommodationBar: FC<IAccommodationBarProps> = ({
  accommodationData,
  startDate,
  endDate,
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
        {`${format(startDate, 'dd.MM.yyyy')} - ${format(
          endDate,
          'dd.MM.yyyy'
        )}`}
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
