/**
 * The external imports
 */
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Box, Center, Spinner } from '@chakra-ui/react'

/**
 * The internal imports
 */
import { QuestionnaireContext } from '../lib/contexts'
import { Page } from '../components'
import TitleBlock from '../components/questionnaire/titleBlock'
import SituationSelection from '../components/questionnaire/situationSelection'
import Characteristic from '../components/questionnaire/characteristic'

const Questionnaire = () => {
  const { t } = useTranslation('questionnaire')

  const [steps, setSteps] = useState([
    {
      key: 'situationSelection',
      title: t('situationSelection.title'),
      type: 'situation',
    },
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(true)

  /**
   * If data exists in localStorage, use it to continue where the user left off
   */
  useEffect(() => {
    if (
      localStorage.getItem('steps') !== null &&
      localStorage.getItem('step') !== null
    ) {
      setSteps(JSON.parse(localStorage.getItem('steps')))
      setCurrentStep(JSON.parse(localStorage.getItem('step')))
    }
    setLoading(false)
  }, [])

  /**
   * Updates the current step in local state and localStorage
   * @param direction integer
   */
  const updateCurrentStep = direction => {
    setCurrentStep(prev => prev + direction)
    localStorage.setItem('step', JSON.stringify(currentStep + direction))
  }

  /**
   * Returns the correct component depending on state
   * @returns TSX component
   */
  const renderStage = () => {
    switch (steps[currentStep].type) {
      case 'situation':
        return <SituationSelection />
      case 'characteristic':
        return <Characteristic />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <Center h='full'>
        <Spinner size='xl' color='salmon' thickness='4px' />
      </Center>
    )
  }

  return (
    <Page title={t('title')} description={t('description')}>
      <QuestionnaireContext.Provider
        value={{
          currentStep,
          updateCurrentStep,
          steps,
          setSteps,
        }}
      >
        <TitleBlock
          title={steps[currentStep].title}
          subtitle={t('subtitle')}
          totalSteps={steps.length}
        />
        <Box h='full' flex={1} pb={12}>
          {renderStage()}
        </Box>
      </QuestionnaireContext.Provider>
    </Page>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'questionnaire'])),
      // Will be passed to the page component as props
    },
  }
}

export default Questionnaire
