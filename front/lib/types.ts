// Common interfaces used in multiple components/pages
export interface IChildren {
  children: React.ReactNode
}

export type ElementType = {
  id: number
  label: string
}
/////////////////////////////////////////////////////////////////////////////////

export interface IEnumOption {
  id: number
  name: string
}

export interface IFormValues {
  startDate: Date
  endDate: Date
  destination?: string | IEnumOption
  activities?: IEnumOption[]
  accommodation: string | { id: number; label: string }
  restaurants: { id: number; label: string; activities: number[] }[]
}

export interface IAnswer {
  id: number
  label: string
  children: string[]
  excludes: string[]
}

export interface IStep {
  id?: number
  key: string
  type?: string
  imageSrc?: string
  answers?: IAnswer[]
  answer?: IAnswer
  formValues?: IFormValues
}

export interface ICharacteristics {
  [key: string]: IStep
}

export type Option = ElementType & {
  activities?: number[]
  unavailable?: boolean
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

export type ModalType = {
  day?: DayType
}

export type DayType = {
  date: string
  schedule: SlotType[]
}

export type DayProps = {
  day: DayType
}

export type CardProps = {
  day: DayType
  slot: SlotType
}

export type SlotType = {
  type: string
  label: string
  address: string
  signs: string[]
  selected?: boolean
}

export interface ICharacteristicMap {
  [key: string]: string[]
}
