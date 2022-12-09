/**
 * The external imports
 */
import { createContext } from 'react'

interface QuestionnaireContextInterface {
  currentStep?: number
  updateCurrentStep?: (number) => void
  steps?: object[]
  setSteps?: React.Dispatch<React.SetStateAction<object[]>>
}

export const QuestionnaireContext =
  createContext<QuestionnaireContextInterface>({})
