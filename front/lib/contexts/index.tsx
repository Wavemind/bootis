/**
 * The external imports
 */
import { createContext } from 'react'

/**
 * Type definitions
 */
import { QuestionnaireContextType, ModalContextType } from '../types'

export const QuestionnaireContext = createContext<QuestionnaireContextType>(
  {} as QuestionnaireContextType
)

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
)
