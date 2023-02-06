// Common interfaces used in multiple components/pages
export interface IChildren {
  children: React.ReactNode
}

export interface IEnumOption {
  id: number
  name: string
}

export interface IElement extends IEnumOption {
  label: string
}

export interface IFormValues {
  startDate: Date
  endDate: Date
  destination?: IEnumOption
  activities?: IEnumOption[]
  accommodation: string | { id: number; label: string }
  cuisines: IElement[]
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

export interface ICategoryProps {
  categoryType: ICategory
  setCategoryType: React.Dispatch<React.SetStateAction<ICategory>>
}

export interface IModal {
  day?: IDay
}

export interface IPictogram {
  link: string
  linkSvg: string
  name: string
}

export interface ISlot extends IEnumOption {
  type: string
  fullAddress: string
  pictureUrl: string
  pictograms?: IPictogram[]
  selected?: boolean
  category?: { section: string }
}

export interface IAlertDialog {
  title: string
  content: string
  action: () => void
  confirmColor: string
  confirmLabel: string
}
