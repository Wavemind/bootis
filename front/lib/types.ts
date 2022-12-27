// Common interfaces used in multiple components/pages
export interface IChildren {
  children: React.ReactNode
}

export interface IEnumOption {
  id: number
  name: string
}

export interface IFormValues {
  startDate: Date
  endDate: Date
  destination?: IEnumOption
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

export interface ICharacteristicMap {
  [key: string]: string[]
}

export interface IDay {
  date: string
  activities: ISlot[]
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

export interface ISlot extends IEnumOption {
  type: string
  fullAddress: string
  signs: string[]
  selected?: boolean
}

export interface IAlertDialog {
  title: string
  content: string
  action: () => void
}
