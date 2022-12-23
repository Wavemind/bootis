// Common interfaces used in multiple components/pages
export interface IChildren {
  children: React.ReactNode
}

export interface IEnumOption {
  id: number
  name: string
}

export interface IElement {
  id: number
  label: string
}

export interface IFormValues {
  startDate: Date
  endDate: Date
  destination?: string | IEnumOption
  activities?: IEnumOption[]
  accommodation: string | { id: number; label: string }
  restaurants: { id: number; label: string; activities: number[] }[]
}

export interface IAnswer extends IElement {
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

export interface ICharacteristicMap {
  [key: string]: string[]
}

export interface IDay {
  date: string
  schedule: ISlot[]
}

export interface ICategory {
  key: string
  label: string
  variant: string
  isMulti: boolean
}

export interface IModal {
  day?: IDay
}

export interface ISlot {
  type: string
  label: string
  address: string
  signs: string[]
  selected?: boolean
}
