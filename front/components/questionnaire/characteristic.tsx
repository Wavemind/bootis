/**
 * The external imports
 */
import { useContext, useMemo } from 'react'
import { Grid, GridItem, Text, Center, VStack, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import { QuestionnaireContext } from '../../lib/contexts'

const Characteristic = () => {
  const { t } = useTranslation('questionnaire')

  const { steps, setSteps, currentStep, updateCurrentStep } =
    useContext(QuestionnaireContext)

  const activeStep = useMemo(() => steps[currentStep], [currentStep])

  /**
   * Update steps with answer and update the currentStep
   */
  const handleClick = answer => {
    const newSteps = [...steps]
    newSteps[currentStep].answer = answer
    setSteps(newSteps)
    localStorage.setItem('steps', JSON.stringify(newSteps))
    updateCurrentStep(1)
  }

  return (
    <VStack justifyContent='space-between' alignItems='flex-start' h='full'>
      <Grid templateColumns='repeat(3, 1fr)' gap={10} mt={10} w='full'>
        <GridItem colSpan={2} pr={10}>
          <VStack alignItems='flex-start'>
            {activeStep.answers.map(answer => (
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
              src={activeStep.imageSrc}
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
