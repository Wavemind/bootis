/**
 * The external imports
 */
import { FC, useMemo } from 'react'
import { HStack, Icon, Text } from '@chakra-ui/react'
import { FaBed } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import format from 'date-fns/format'

/**
 * Type imports
 */
import { ISlot, IStep } from '../../lib/types'

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

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => {
    const stepsData = JSON.parse(localStorage.getItem('steps') as string)
    return stepsData.find((step: IStep) => step.key === 'voyageForm').formValues
  }, [])

  // TODO : Get data from backend
  return (
    <HStack w='full' bg='teal' borderRadius='lg' p={3} spacing={8}>
      <Icon as={FaBed} color='white' h={6} w={6} />
      <Text color='white' fontFamily='Noir Pro Medium, sans-serif'>
        {accommodationData.name}
      </Text>
      <Text color='white' fontFamily='Noir Pro Medium, sans-serif'>
        {`${format(
          new Date(voyageFormData.startDate),
          'dd.MM.yyyy'
        )} - ${format(new Date(voyageFormData.endDate), 'dd.MM.yyyy')}`}
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
