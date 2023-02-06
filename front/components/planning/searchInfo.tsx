/**
 * The external imports
 */
import { FC, useMemo, useContext, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  HStack,
  Flex,
  Text,
  Box,
  SimpleGrid,
  Button,
  VStack,
} from '@chakra-ui/react'

/**
 * The internal imports
 */
import { AlertDialogContext } from '../../lib/contexts'
import { useLazyGetPlanningQuery } from '../../lib/services/modules/planning'

/**
 * Type imports
 */
import { IStep, IElement } from '../../lib/types'

export interface ISearchInfoProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchInfo: FC<ISearchInfoProps> = ({ setLoading }) => {
  const { t } = useTranslation('planning')
  const router = useRouter()

  const { openAlertDialog } = useContext(AlertDialogContext)

  const [getPlanning, { data = {}, isFetching, isSuccess }] =
    useLazyGetPlanningQuery()

  /**
   * If the planning is properly received from the backend,
   * put it in localStorage and set loading to false
   */
  useEffect(() => {
    if (!isFetching && isSuccess) {
      localStorage.setItem('planning', JSON.stringify(data))
      setLoading(false)
    }
  }, [isSuccess, isFetching])

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => {
    const stepsData = JSON.parse(localStorage.getItem('steps') as string)
    return stepsData.find((step: IStep) => step.key === 'voyageForm').formValues
  }, [])

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

  /**
   * Regenerates a new plan
   */
  const handleRegenerate = () => {
    openAlertDialog({
      title: t('restartDialogTitle'),
      content: t('restartDialogContent'),
      action: () => {
        localStorage.removeItem('planning')
        setLoading(true)
        getPlanning({
          startDate: voyageFormData.startDate,
          endDate: voyageFormData.endDate,
          region: voyageFormData.destination?.name || '',
          categories:
            voyageFormData.activities?.map(
              (activity: IElement) => activity.id
            ) || [],
        })
      },
      confirmColor: 'teal',
      confirmLabel: t('yes'),
    })
  }

  return (
    <Flex
      flexDir='column'
      borderRadius='lg'
      h='full'
      boxShadow='lg'
      w='full'
      p={4}
    >
      <SimpleGrid columns={3} flex={1}>
        <VStack alignItems='flex-start'>
          <Text>{t('regionSelection')}</Text>
          <HStack>
            <Box bg='black' borderRadius='full' py={1} px={4} w='fit-content'>
              <Text color='white'>{voyageFormData.destination.label}</Text>
            </Box>
          </HStack>
        </VStack>
        <VStack alignItems='flex-start'>
          <Text>{t('activitySelection')}</Text>
          <HStack>
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
          </HStack>
        </VStack>
        <VStack alignItems='flex-start'>
          <Text>{t('restaurantSelection')}</Text>
          <HStack>
            {voyageFormData.cuisines.map((cuisine: IElement) => (
              <Box
                key={`cuisine_${cuisine.id}`}
                bg='black'
                borderRadius='full'
                py={1}
                px={4}
                w='fit-content'
              >
                <Text color='white'>{cuisine.name}</Text>
              </Box>
            ))}
          </HStack>
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
      </HStack>
    </Flex>
  )
}

export default SearchInfo
