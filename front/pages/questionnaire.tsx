/**
 * The external imports
 */
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Box } from '@chakra-ui/react'

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

  // TODO : useEffect to check local storage
  // If local storage => re apply state from local storage
  // Else do nothing

  const [steps, setSteps] = useState([
    {
      key: 'situationSelection',
      title: t('situationSelection.title'),
      type: 'situation',
    },
  ])
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (localStorage.getItem('steps') !== null) {
      setSteps(JSON.parse(localStorage.getItem('steps')))
      setCurrentStep(JSON.parse(localStorage.getItem('step')))
    }
  }, [])

  const updateCurrentStep = direction => {
    localStorage.setItem('steps', JSON.stringify(steps))
    localStorage.setItem('step', JSON.stringify(currentStep + direction))
    setCurrentStep(prev => prev + direction)
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

  return (
    <Page
      title={t('title', { ns: 'common' })}
      description={t('description', { ns: 'common' })}
    >
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
        <Box h='full' flex={1}>
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
