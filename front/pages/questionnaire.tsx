/**
 * The external imports
 */
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

/**
 * The internal imports
 */
import { QuestionnaireContext } from '../lib/contexts'
import { Page } from '../components'
import TitleBlock from '../components/questionnaire/titleBlock'
import Step1 from '../components/questionnaire/step1'

const Questionnaire = () => {
  const { t } = useTranslation('questionnaire')

  const [step, setStep] = useState(1)

  /**
   * Returns the correct component depending on state
   * @returns TSX component
   */
  // TODO : Find a better way to do this
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />
    }
  }

  return (
    <Page
      title={t('title', { ns: 'common' })}
      description={t('description', { ns: 'common' })}
    >
      <QuestionnaireContext.Provider value={{ step, setStep }}>
        <TitleBlock
          title='Dans un premier temps pouvez-vous nous dire quel est votre type de
            mobilité ?'
          subtitle='Sélectionnez votre choix en cliquant sur la card qui correspond le
            mieux à votre votre situation'
        />
        {renderStep()}
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
