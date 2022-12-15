/**
 * The external imports
 */
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

// _App types
type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// Page wrapper component types
export type PageType = {
  children: React.ReactNode
  title: string
  description: string
}

// Questionnaire types
export type StepType = {
  key: string
  type: string
  imageSrc?: string
  answers?: AnswerType[]
  answer?: AnswerType
}

export type CharacteristicType = {
  [characteristicKey: string]: StepType
}

export type AnswerType = {
  id: number
  label: string
  children: string[]
  excludes: string[]
}

export type QuestionnaireContextType = {
  steps: StepType[]
  setSteps: React.Dispatch<React.SetStateAction<StepType[]>>
  currentStep: number
  updateCurrentStep: (direction: number) => void
  resetQuestionnaire: () => void
}
