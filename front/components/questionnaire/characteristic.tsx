/**
 * The external imports
 */
import { useContext } from 'react'
import { Grid, GridItem, Text, Center, VStack, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import { QuestionnaireContext } from '../../lib/contexts'
import maxSlopeImage from '../../public/maxSlopeImage.svg'

const Characteristic = () => {
  const { t } = useTranslation('questionnaire')

  const { steps, setSteps, currentStep, updateCurrentStep } =
    useContext(QuestionnaireContext)

  /**
   * Update steps with answer and update the currentStep
   */
  const handleClick = answer => {
    const newSteps = [...steps]
    newSteps[currentStep].answer = answer
    setSteps(newSteps)
    updateCurrentStep(1)
  }

  // TODO : Get the image dynamically
  return (
    <VStack justifyContent='space-between' alignItems='flex-start' h='full'>
      <Grid templateColumns='repeat(3, 1fr)' gap={10} mt={10} w='full'>
        <GridItem colSpan={2} pr={10}>
          <VStack alignItems='flex-start'>
            {steps[currentStep].answers.map(answer => (
              <Button
                key={`answer_${answer.id}`}
                variant={
                  steps[currentStep].answer?.id === answer.id
                    ? 'salmon'
                    : 'primary'
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
              src={maxSlopeImage}
              alt={t('logoAlt')}
              height={30}
              width={250}
            />
          </Center>
        </GridItem>
      </Grid>
      <Button variant='black' onClick={() => updateCurrentStep(-1)}>
        Retour
      </Button>
    </VStack>
  )
}

export default Characteristic
