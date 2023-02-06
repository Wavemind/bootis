/**
 * The external imports
 */
import { FC, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
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
 * Type imports
 */
import { IStep, IElement } from '../../lib/types'

const SearchInfo: FC = () => {
  const { t } = useTranslation('planning')

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => {
    const stepsData = JSON.parse(localStorage.getItem('steps') as string)
    return stepsData.find((step: IStep) => step.key === 'voyageForm').formValues
  }, [])

  /**
   * Regenerates a new plan
   */
  const handleRegenerate = () => {
    console.log('regenerate a plan')
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
        <Link href='/questionnaire'>
          <Button size='sm' color='teal' variant='outline' borderColor='teal'>
            {t('restart')}
          </Button>
        </Link>
      </HStack>
    </Flex>
  )
}

export default SearchInfo
