/**
 * The external imports
 */
import { FC, useMemo, useContext, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { saveAs } from 'file-saver'
import {
  HStack,
  Flex,
  Text,
  Box,
  SimpleGrid,
  Button,
  VStack,
  GridItem,
} from '@chakra-ui/react'

/**
 * The internal imports
 */
import { AlertDialogContext } from '../../lib/contexts'
import { readVoyageFormData } from '../../lib/utils/readVoyageFormData'
import { useLazyGetPlanningPdfQuery } from '../../lib/services/modules/planning'

/**
 * Type imports
 */
import { IElement, IPlanningPdf } from '../../lib/types'

/**
 * Type definitions
 */
export interface ISearchInfoProps {
  handleRegenerate: () => void
}

const SearchInfo: FC<ISearchInfoProps> = ({ handleRegenerate }) => {
  const { t } = useTranslation('planning')
  const router = useRouter()

  const { openAlertDialog } = useContext(AlertDialogContext)
  const [getPlanningPdf, { data = {} as IPlanningPdf, isSuccess, isFetching }] =
    useLazyGetPlanningPdfQuery()
  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => readVoyageFormData(), [])

  /**
   * Opens the alert dialog to confirm return to the voyage form
   */
  const handleRestart = () => {
    openAlertDialog({
      title: t('restartDialogTitle'),
      content: t('restartDialogContent'),
      action: () => {
        localStorage.removeItem('planning')
        router.push('/questionnaire')
      },
      confirmColor: 'teal',
      confirmLabel: t('yes'),
    })
  }

  const exportPlanning = () => {
    getPlanningPdf({ planning: localStorage.getItem('planning') as string })
  }

  useEffect(() => {
    if (!isFetching && isSuccess) {
      saveAs(`${process.env.NEXT_PUBLIC_API_URL}/${data.url}`, 'planning.pdf')
    }
  }, [isSuccess, isFetching])

  return (
    <GridItem
      borderRadius='lg'
      boxShadow='lg'
      p={4}
      colSpan={3}
      display='flex'
      flexDirection='column'
    >
      <SimpleGrid columns={3} flex={1}>
        <VStack alignItems='flex-start' px={2}>
          <Text>{t('regionSelection')}</Text>
          <HStack>
            <Box bg='black' borderRadius='full' py={1} px={4} w='fit-content'>
              <Text color='white'>{voyageFormData.destination.label}</Text>
            </Box>
          </HStack>
        </VStack>
        <VStack alignItems='flex-start' px={2}>
          <Text>{t('activitySelection')}</Text>
          <Flex wrap='wrap' rowGap={2} gap={2}>
            {voyageFormData.activities.map((activity: IElement) => (
              <Box
                key={`activity_${activity.id}`}
                bg='black'
                borderRadius='full'
                py={1}
                px={4}
                w='fit-content'
              >
                <Text color='white'>{activity.name}</Text>
              </Box>
            ))}
          </Flex>
        </VStack>
        <VStack alignItems='flex-start' px={2}>
          <Text>{t('restaurantSelection')}</Text>
          <Flex wrap='wrap' rowGap={2} gap={2}>
            {voyageFormData.cuisines.map((cuisine: IElement) => (
              <Box
                key={`cuisine_${cuisine.id}`}
                bg='black'
                borderRadius='full'
                py={1}
                px={4}
                w='fit-content'
              >
                <Text color='white'>{cuisine.label}</Text>
              </Box>
            ))}
          </Flex>
        </VStack>
      </SimpleGrid>
      <HStack spacing={12} justifyContent='flex-end'>
        <Button
          size='sm'
          color='white'
          variant='solid'
          bg='teal'
          onClick={handleRegenerate}
        >
          {t('newPlanning')}
        </Button>
        <Button
          size='sm'
          color='teal'
          variant='outline'
          borderColor='teal'
          onClick={handleRestart}
        >
          {t('restart')}
        </Button>
        <Button
          variant='black'
          size='sm'
          onClick={exportPlanning}
          disabled={isFetching}
        >
          {t('export')}
        </Button>
      </HStack>
    </GridItem>
  )
}

export default SearchInfo
