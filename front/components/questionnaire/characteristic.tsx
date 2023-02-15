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
import getCharacteristics from '../../lib/config/characteristics'

/**
 * Type imports
 */
import {
  IAnswer,
  ICharacteristics,
  IStep,
  TDefaultValues,
} from '../../lib/types'

const Characteristic: FC = () => {
  const { t } = useTranslation('questionnaire')

  const { steps, setSteps, currentStep, updateCurrentStep } =
    useContext(QuestionnaireContext)

  const activeStep = useMemo(() => steps[currentStep], [currentStep])

  /**
   * Update steps with answer and update the currentStep
   */
  const handleClick = (answer: IAnswer) => {
    const characteristics = getCharacteristics(t)

    const newSteps = [...steps]
    const voyageStep = newSteps.pop()

    if (answer.unknown) {
      const situation = newSteps[0].answer
      if (answer.values && situation) {
        newSteps[currentStep].answer =
          answer.values[situation as TDefaultValues]
      }
    } else {
      newSteps[currentStep].answer = answer.value
    }

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
      newSteps.push(characteristics[keyStep as keyof ICharacteristics])
    )

    newSteps.push(voyageStep as IStep)

    setSteps(newSteps)
    localStorage.setItem('steps', JSON.stringify(newSteps))
    updateCurrentStep(1)
  }

  return (
    <VStack
      justifyContent='space-between'
      alignItems='flex-start'
      h='full'
      key={`answer_${activeStep.key}`}
    >
      <Grid templateColumns='repeat(3, 1fr)' gap={10} mt={10} w='full'>
        <GridItem colSpan={2} pr={10}>
          <VStack alignItems='flex-start'>
            {activeStep.answers?.map(answer => (
              <Button
                key={`answer_${activeStep.key}_${answer.value}`}
                //  variant={activeStep.answer === answer.value ? 'salmon' : 'primary'}
                variant={'primary'}
                w='full'
                onClick={() => handleClick(answer)}
              >
                <Text
                  w='full'
                  textAlign='left'
                  fontSize='md'
                  fontWeight='light'
                  fontFamily='Arial, sans-serif'
                >
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
    </VStack>
  )
}

export default Characteristic
