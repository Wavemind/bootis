/**
 * Type imports
 */
import { IStep } from '../types'

export const readVoyageFormData = () => {
  const stepsData = JSON.parse(localStorage.getItem('steps') as string)
  return stepsData.find((step: IStep) => step.key === 'voyageForm').formValues
}
