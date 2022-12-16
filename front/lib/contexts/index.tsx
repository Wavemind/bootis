/**
 * The external imports
 */
import { createContext } from 'react'

/**
 * Type definitions
 */
import { QuestionnaireContextType } from '../types'

export const QuestionnaireContext = createContext<QuestionnaireContextType>(
  {} as QuestionnaireContextType
)
