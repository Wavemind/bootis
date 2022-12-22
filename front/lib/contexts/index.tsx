/**
 * The external imports
 */
import { createContext } from 'react'

/**
 * Type imports
 */
import { IStep } from '../types'

/**
 * Type definitions
 */

interface IQuestionnaireContext {
  steps: IStep[]
  setSteps: React.Dispatch<React.SetStateAction<IStep[]>>
  currentStep: number
  updateCurrentStep: (direction: number) => void
  resetQuestionnaire: () => void
}

export const QuestionnaireContext = createContext<IQuestionnaireContext>(
  {} as IQuestionnaireContext
)
