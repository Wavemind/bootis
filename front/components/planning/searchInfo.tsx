/**
 * The external imports
 */
import { FC, useMemo, useContext } from 'react'
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
import { readVoyageFormData } from '../../lib/utils/readVoyageFormData'

/**
 * Type imports
 */
import { IElement } from '../../lib/types'

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
                <Text color='white'>{cuisine.name}</Text>
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
        <Button variant='black' size='sm' onClick={handleRestart}>
          {t('export')}
        </Button>
      </HStack>
    </Flex>
  )
}

export default SearchInfo
