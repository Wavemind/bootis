/**
 * The external imports
 */
import { createContext } from 'react'

/**
 * Type definitions
 */
interface AnswerInterface {
  id: number
  label: string
}

interface stepInterface {
  key: string
  title: string
  type: string
  answers?: AnswerInterface[]
  answer?: AnswerInterface
}

interface QuestionnaireContextInterface {
  currentStep?: number
  updateCurrentStep?: (number) => void
  steps?: stepInterface[]
  setSteps?: React.Dispatch<React.SetStateAction<object[]>>
}

export const QuestionnaireContext =
  createContext<QuestionnaireContextInterface>({})
