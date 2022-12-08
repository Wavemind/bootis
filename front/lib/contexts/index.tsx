/**
 * The external imports
 */
import { createContext } from 'react'

interface QuestionnaireContextInterface {
  step?: number
  setStep?: React.Dispatch<React.SetStateAction<number>>
}

export const QuestionnaireContext =
  createContext<QuestionnaireContextInterface>({})
