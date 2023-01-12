/**
 * The external imports
 */
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Box, Center, Button, Spinner, VStack, HStack } from '@chakra-ui/react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'

/**
 * The internal imports
 */
import { QuestionnaireContext } from '../lib/contexts'
import {
  Page,
  Characteristic,
  SituationSelection,
  Voyage,
  TitleBlock,
} from '../components'
import { AppDispatch, wrapper } from '../lib/store'
import { api } from '../lib/services/api'
import { getRegions } from '../lib/services/modules/region'
import { getCuisine } from '../lib/services/modules/cuisine'
import {
  getActivityCategories,
  getAccommodationCategories,
} from '../lib/services/modules/category'

/**
 * Type imports
 */
import { IStep } from '../lib/types'

const Questionnaire = () => {
  const { t } = useTranslation('questionnaire')
  const controls = useAnimationControls()

  const [steps, setSteps] = useState<IStep[]>([
    { key: 'situationSelection', type: 'situation' },
  ])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  /**
   * If data exists in localStorage, use it to continue where the user left off
   */
  useEffect(() => {
    if (
      localStorage.getItem('steps') !== null &&
      localStorage.getItem('step') !== null
    ) {
      setSteps(JSON.parse(localStorage.getItem('steps') as string))
      setCurrentStep(JSON.parse(localStorage.getItem('step') as string))
    }
    setLoading(false)
  }, [])

  /**
   * Updates the current step in local state and localStorage
   * @param direction integer
   */
  const updateCurrentStep = async (direction: number) => {
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
      case 'voyage':
        return <Voyage />
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
        <VStack
          overflow='hidden'
          flex={1}
          alignItems='flex-start'
          justifyContent='space-between'
        >
          <AnimatePresence
            mode='wait'
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Box as={motion.div} animate={controls} w='full'>
              <TitleBlock
                title={t(`${steps[currentStep].key}.title`)}
                subtitle={t(`${steps[currentStep].type}Subtitle`)}
              />
              <Box h='full' w='full' flex={1} pb={12}>
                {renderStage()}
              </Box>
            </Box>
          </AnimatePresence>
          {currentStep > 0 && (
            <HStack justifyContent='space-between' w='full'>
              <VStack>
                <Button variant='black' onClick={() => updateCurrentStep(-1)}>
                  {t('back', { ns: 'questionnaire' })}
                </Button>
                <Button variant='link' onClick={resetQuestionnaire}>
                  {t('reset', { ns: 'questionnaire' })}
                </Button>
              </VStack>
              {steps[currentStep].type === 'voyage' && (
                <Button variant='primary' type='submit' form='voyage-form'>
                  {t('continue', { ns: 'voyage' })}
                </Button>
              )}
            </HStack>
          )}
        </VStack>
      </QuestionnaireContext.Provider>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async ({ locale }) => {
    store.dispatch(getRegions.initiate() as AppDispatch)
    store.dispatch(getCuisine.initiate() as AppDispatch)
    store.dispatch(getActivityCategories.initiate() as AppDispatch)
    store.dispatch(getAccommodationCategories.initiate() as AppDispatch)
    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()))

    return {
      props: {
        ...(await serverSideTranslations(locale as string, [
          'common',
          'questionnaire',
          'voyage',
        ])),
        // Will be passed to the page component as props
      },
    }
  })

export default Questionnaire
