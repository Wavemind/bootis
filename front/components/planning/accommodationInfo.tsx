/**
 * The external imports
 */
import { FC, useMemo, useContext } from 'react'
import {
  HStack,
  Icon,
  Text,
  VStack,
  Divider,
  Button,
  GridItem,
} from '@chakra-ui/react'
import { MdOutlineLocationOn } from 'react-icons/md'
import { useTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import { ModalContext } from '../../lib/contexts'
import { formatDate } from '../../lib/utils/date'
import { readVoyageFormData } from '../../lib/utils/readVoyageFormData'

/**
 * Type imports
 */
import { ISlot } from '../../lib/types'

/**
 * Type definitions
 */
interface IAccommodationInfoProps {
  data: ISlot
}

const AccommodationInfo: FC<IAccommodationInfoProps> = ({ data }) => {
  const { t } = useTranslation('planning')

  const { openModal } = useContext(ModalContext)

  /**
   * Handle edit action for the accommodation
   */
  const handleReplace = () => {
    openModal({ type: 'accommodation' })
  }

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => readVoyageFormData(), [])

  return (
    <GridItem borderRadius='lg' boxShadow='lg' p={4}>
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
    </GridItem>
  )
}

export default AccommodationInfo
