/**
 * The external imports
 */
import { FC, useContext, useMemo } from 'react'
import { Grid, GridItem, Text, Center, VStack, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import findIndex from 'lodash/findIndex'

/**
 * The internal imports
 */
import { QuestionnaireContext } from '../../lib/contexts'
import characteristics from '../../lib/config/characteristics'

/**
 * Type definitions
 */
import { AnswerType, CharacteristicsType } from '../../lib/types'

const Characteristic: FC = () => {
  const { t } = useTranslation('questionnaire')

  const {
    steps,
    setSteps,
    currentStep,
    updateCurrentStep,
    resetQuestionnaire,
  } = useContext(QuestionnaireContext)

  const activeStep = useMemo(() => steps[currentStep], [currentStep])

  /**
   * Update steps with answer and update the currentStep
   */
  const handleClick = (answer: AnswerType) => {
    const newSteps = [...steps]
    newSteps[currentStep].answer = answer

    // Remove characteristics
    answer.excludes.forEach(keyStep => {
      const indexToRemove = findIndex(newSteps, ['key', keyStep])
      if (indexToRemove > -1) {
        newSteps.splice(indexToRemove, 1)
      }
    })

    // Remove existing values for needed characteristics
    answer.children.forEach(keyStep => {
      const indexToRemove = findIndex(newSteps, ['key', keyStep])
      if (indexToRemove > -1) {
        newSteps.splice(indexToRemove, 1)
      }
    })

    // Add characteristics
    answer.children.forEach((keyStep: string) =>
      newSteps.push(characteristics[keyStep as keyof CharacteristicsType])
    )

    setSteps(newSteps)
    localStorage.setItem('steps', JSON.stringify(newSteps))
    updateCurrentStep(1)
  }

  return (
    <VStack justifyContent='space-between' alignItems='flex-start' h='full'>
      <Grid templateColumns='repeat(3, 1fr)' gap={10} mt={10} w='full'>
        <GridItem colSpan={2} pr={10}>
          <VStack alignItems='flex-start'>
            {activeStep.answers?.map(answer => (
              <Button
                key={`answer_${answer.id}`}
                variant={
                  activeStep.answer?.id === answer.id ? 'salmon' : 'primary'
                }
                w='full'
                onClick={() => handleClick(answer)}
              >
                <Text w='full' textAlign='left'>
                  {answer.label}
                </Text>
              </Button>
            ))}
          </VStack>
        </GridItem>
        <GridItem>
          <Center>
            <Image
              src={activeStep.imageSrc as string}
              alt={t('logoAlt')}
              height={30}
              width={250}
            />
          </Center>
        </GridItem>
      </Grid>
      <Button variant='black' onClick={() => updateCurrentStep(-1)}>
        {t('back')}
      </Button>
      <Button variant='link' onClick={resetQuestionnaire}>
        {t('reset')}
      </Button>
    </VStack>
  )
}

export default Characteristic
