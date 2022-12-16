/**
 * The external imports
 */
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { CalendarDate, CalendarValues } from '@uselessdev/datepicker'

// Global types
export type ChildrenType = {
  children: React.ReactNode
}

export type ElementType = {
  id: number
  label: string
}
/////////////////////////////////////////////////////////////////////////////////

// _App types
type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
/////////////////////////////////////////////////////////////////////////////////

// Page wrapper component types
export type PageType = ChildrenType & {
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
  formValues?: VoyageFormValues
}

export type CharacteristicsType = {
  [key: string]: StepType
}

export type CharacteristicMapType = {
  [key: string]: string[]
}

export type AnswerType = ElementType & {
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
}
/////////////////////////////////////////////////////////////////////////////////

// Component types
export type GridItemProps = ChildrenType & {
  bg: string
  handleClick: () => void
}

export type LinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export type CalendarProps = {
  placeholder: string
  date: CalendarDate | CalendarValues
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>
}

export type Option = ElementType & {
  activities?: number[]
  unavailable?: boolean
}

export type SelectProps = {
  options: Option[]
  placeholder: string | React.ReactNode
  selected: number
  setSelected: React.Dispatch<React.SetStateAction<number | undefined | null>>
}

export type VoyageSelectProps = {
  name: string
  label: string
  subLabel: string
  options: (ElementType & { activities?: number[] })[]
  isMulti?: boolean
  hasInfo?: boolean
  infoContent?: React.ReactNode
}

export type DatePickerProps = {
  name: string
  label: string
}
/////////////////////////////////////////////////////////////////////////////////

// Voyage types
export type VoyageFormValues = {
  startDate: Date
  endDate: Date
  destination?: string | (ElementType & { activities: number[] })
  activities?: ElementType[]
  accommodation: string | { id: number; label: string }
  restaurants: (ElementType & { activities: number[] })[]
}
/////////////////////////////////////////////////////////////////////////////////

// Planning types
export type CategoryType = {
  key: string
  label: string
  variant: string
  isMulti: boolean
}
export type CategorySelectionProps = {
  categories: CategoryType[]
  category: CategoryType
  setCategory: React.Dispatch<React.SetStateAction<CategoryType>>
}
