/**
 * The external imports
 */
import { useState, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

/**
 * The internal imports
 */
import { QuestionnaireContext } from '../lib/contexts'
import { Page } from '../components'
import TitleBlock from '../components/questionnaire/titleBlock'
import SituationSelection from '../components/questionnaire/situationSelection'
import Characteristic from '../components/questionnaire/characteristic'
import characteristicMap from '../lib/config/characteristicMap'
import characteristics from '../lib/config/characteristics'
import questionnaireStepper from '../lib/config/questionnaireStepper'

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

  const updateCurrentStep = direction => {
    // TODO : Save in local storage: step, steps
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
        {renderStage()}
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
