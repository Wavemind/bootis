/**
 * The external imports
 */
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { CalendarDate, CalendarValues } from '@uselessdev/datepicker'

// _App types
type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
/////////////////////////////////////////////////////////////////////////////////

// Page wrapper component types
export type PageType = {
  children: React.ReactNode
  title: string
  description: string
}
/////////////////////////////////////////////////////////////////////////////////

// Questionnaire types
export type StepType = {
  key: string
  type?: string
  imageSrc?: string
  answers?: AnswerType[]
  answer?: AnswerType
}

export type CharacteristicsType = {
  [key: string]: StepType
}

export type CharacteristicMapType = {
  [key: string]: string[]
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

export type TitleBlockProps = {
  title: string
  subtitle: string
  totalSteps: number
}
/////////////////////////////////////////////////////////////////////////////////

// Component types
export type GridItemProps = {
  bg: string
  handleClick: () => void
  children: React.ReactNode
}

export type LinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export type CalendarProps = {
  placeholder: string
  date: CalendarDate | CalendarValues
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>
}

export type Option = {
  id: number
  label: string
  activities?: number[]
  unavailable?: boolean
}

export type SelectProps = {
  options: Option[]
  placeholder: string | React.ReactNode
  selected: number
  setSelected: React.Dispatch<React.SetStateAction<number | undefined | null>>
}
