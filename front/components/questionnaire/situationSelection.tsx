/**
 * The external imports
 */
import { FC, useContext } from 'react'
import { Grid, Text, Box, VStack, Heading, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import GridItem from './gridItem'
import { QuestionnaireContext } from '../../lib/contexts'
import characteristicMap from '../../lib/config/characteristicMap'
import getCharacteristics from '../../lib/config/characteristics'
import WheelchairFemale from '../../public/wheelchair_female.svg'
import WheelchairCompanion from '../../public/wheelchair_companion.svg'
import ElectricScooter from '../../public/electric_scooter.svg'
import Cane from '../../public/cane.svg'
import Rollator from '../../public/rollator.svg'

/**
 * Type imports
 */
import { ICharacteristicMap } from '../../lib/types'

const SituationSelection: FC = () => {
  const { t } = useTranslation('questionnaire')

  const { updateCurrentStep, setSteps, currentStep } =
    useContext(QuestionnaireContext)

  /**
   * Filters the characteristics based on situation, updates local state and local storage
   */
  const handleClick = (situation: string) => {
    const characteristics = getCharacteristics(t)
    const filteredCharacteristics = characteristicMap[
      situation as keyof ICharacteristicMap
    ].map((characteristicKey: string) => ({
      ...characteristics[characteristicKey],
    }))
    const newSteps = [
      { key: 'situationSelection', type: 'situation' },
      ...filteredCharacteristics,
      { key: 'voyageForm', type: 'voyage' },
    ]
    newSteps[currentStep].answer = situation
    setSteps(newSteps)
    localStorage.setItem('steps', JSON.stringify(newSteps))
    updateCurrentStep(1)
  }

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={10} mt={10} px={9}>
      <GridItem bg='blue' handleClick={() => handleClick('wheelchair')}>
        <Heading variant='h2' mb={10}>
          {t('situationSelection.wheelchair.header')}
        </Heading>
        <VStack spacing={4}>
          <Text fontSize='sm' zIndex={10}>
            {t('situationSelection.wheelchair.paragraph')}
          </Text>
          <Text fontSize='sm' zIndex={10}>
            {t('situationSelection.adaptedQuestions')}
          </Text>
        </VStack>
        <Box ml={-10} mb={-6}>
          <Image
            src={WheelchairFemale}
            height={350}
            alt={t('situationSelection.wheelchair.alt')}
          />
        </Box>
      </GridItem>
      <GridItem
        bg='salmon'
        handleClick={() => handleClick('electricWheelchair')}
      >
        <Heading variant='h2' mb={10}>
          {t('situationSelection.wheelchairCompanion.header')}
        </Heading>
        <VStack spacing={4}>
          <Text fontSize='sm' zIndex={10}>
            {t('situationSelection.wheelchairCompanion.paragraph')}
          </Text>
          <Text fontSize='sm' zIndex={10}>
            {t('situationSelection.adaptedQuestions')}
          </Text>
        </VStack>
        <Box ml={-7} mb={-6} mt={-4}>
          <Image
            src={WheelchairCompanion}
            height={240}
            alt={t('situationSelection.wheelchairCompanion.alt')}
          />
        </Box>
      </GridItem>
      <GridItem bg='teal' handleClick={() => handleClick('scooter')}>
        <Heading variant='h2' mb={10}>
          {t('situationSelection.electricScooter.header')}
        </Heading>
        <VStack spacing={4}>
          <Text fontSize='sm' zIndex={10}>
            {t('situationSelection.electricScooter.paragraph')}
          </Text>
          <Text fontSize='sm' zIndex={10}>
            {t('situationSelection.adaptedQuestions')}
          </Text>
        </VStack>
        <Box mt={14} mb={-10}>
          <Image
            src={ElectricScooter}
            height={300}
            alt={t('situationSelection.electricScooter.alt')}
          />
        </Box>
      </GridItem>
      <GridItem bg='beige' handleClick={() => handleClick('cane')}>
        <Heading variant='h2' mb={10}>
          {t('situationSelection.cane.header')}
        </Heading>
        <VStack spacing={4}>
          <Text fontSize='sm' zIndex={10}>
            {t('situationSelection.cane.paragraph')}
          </Text>
          <Text fontSize='sm' zIndex={10}>
            {t('situationSelection.adaptedQuestions')}
          </Text>
        </VStack>
        <Flex mt={24} mb={-6} justifyContent='space-between'>
          <Box ml={-5} mb={-6}>
            <Image
              src={Cane}
              height={280}
              alt={t('situationSelection.cane.caneAlt')}
            />
          </Box>
          <Box mr={-5} mb={-6}>
            <Image
              src={Rollator}
              height={290}
              alt={t('situationSelection.cane.rollatorAlt')}
            />
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default SituationSelection
