/**
 * The external imports
 */
import { FC, useMemo } from 'react'
import {
  HStack,
  Icon,
  Text,
  Box,
  VStack,
  Divider,
  Button,
} from '@chakra-ui/react'
import { MdOutlineLocationOn } from 'react-icons/md'
import { useTranslation } from 'next-i18next'

/**
 * Type imports
 */
import { ISlot, IStep } from '../../lib/types'
import { formatDate } from '../../lib/utils/date'

/**
 * Type definitions
 */
interface IAccommodationInfoProps {
  data: ISlot
}

const AccommodationInfo: FC<IAccommodationInfoProps> = ({ data }) => {
  const { t } = useTranslation('planning')

  /**
   * Handle edit action for the accommodation
   */
  const handleReplace = () => {
    console.log('TODO : Edit the hotel')
  }

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => {
    const stepsData = JSON.parse(localStorage.getItem('steps') as string)
    return stepsData.find((step: IStep) => step.key === 'voyageForm').formValues
  }, [])

  return (
    <Box borderRadius='lg' boxShadow='lg' w='25%' p={4}>
      <VStack alignItems='flex-start' spacing={4}>
        <Text fontWeight='bold' fontSize='lg'>
          {t('accommodationSelection')}
        </Text>
        <Text fontSize='lg'>{data.name}</Text>
        <HStack>
          <Icon as={MdOutlineLocationOn} h={6} w={6} />
          <Text fontSize='sm'>{data.fullAddress}</Text>
        </HStack>
        <Divider borderColor='teal' borderWidth={1} />
        <Text fontWeight='bold'>
          {t('accommodationDates', {
            startDate: formatDate(voyageFormData.startDate, 'd'),
            endDate: formatDate(voyageFormData.endDate, 'd MMM yyyy'),
          })}
        </Text>
        <Button
          size='sm'
          color='teal'
          variant='outline'
          borderColor='teal'
          onClick={handleReplace}
        >
          {t('replace')}
        </Button>
      </VStack>
    </Box>
  )
}

export default AccommodationInfo