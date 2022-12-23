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
import { IDay, IModal, IAlertDialog } from '../types'

interface IQuestionnaireContext {
  steps: IStep[]
  setSteps: React.Dispatch<React.SetStateAction<IStep[]>>
  currentStep: number
  updateCurrentStep: (direction: number) => void
  resetQuestionnaire: () => void
}

interface IModalContext {
  isModalOpen: boolean
  openModal: ({ day }: IModal) => void
  closeModal: () => void
  selectedDay: IDay
}

interface IAlertDialogContext {
  isAlertDialogOpen: boolean
  openAlertDialog: ({ title, content, action }: IAlertDialog) => void
  closeAlertDialog: () => void
  alertDialogContent: IAlertDialog
}

export const QuestionnaireContext = createContext<IQuestionnaireContext>(
  {} as IQuestionnaireContext
)

export const ModalContext = createContext<IModalContext>({} as IModalContext)

export const AlertDialogContext = createContext<IAlertDialogContext>(
  {} as IAlertDialogContext
)
