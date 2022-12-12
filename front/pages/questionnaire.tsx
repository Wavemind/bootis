/**
 * The external imports
 */
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Box, Center, Spinner } from '@chakra-ui/react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'

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
  const controls = useAnimationControls()

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
  const updateCurrentStep = async direction => {
    await controls.start({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    })
    setCurrentStep(prev => prev + direction)
    await localStorage.setItem('step', JSON.stringify(currentStep + direction))
    await controls.start({
      opacity: 0,
      x: direction > 0 ? '100%' : '-100%',
      transition: { duration: 0.1 },
    })
    await controls.start({
      opacity: 1,
      x: '0%',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    })
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
  /**
   * Resets the questionnaire and clears the localStorage elements
   */
  const resetQuestionnaire = () => {
    localStorage.removeItem('steps')
    localStorage.removeItem('step')
    setCurrentStep(0)
    setSteps([
      {
        key: 'situationSelection',
        title: t('situationSelection.title'),
        type: 'situation',
      },
    ])
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
          resetQuestionnaire,
        }}
      >
        <Box overflow='hidden'>
          <AnimatePresence
            mode='wait'
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <motion.div animate={controls}>
              <TitleBlock
                title={`${steps[currentStep].title} - ${currentStep}`}
                subtitle={t('subtitle')}
                totalSteps={steps.length}
              />
              <Box h='full' flex={1} pb={12}>
                {renderStage()}
              </Box>
            </motion.div>
          </AnimatePresence>
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
