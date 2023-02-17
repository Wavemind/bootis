import { IStep, TDefaultValues, ICharacteristicInput } from '../types'

/**
 * convertCharacteristics()
 *
 * Filter and map a given array of IStep objects for those that have a type of
 * `characteristic`.
 *
 * @param {IStep[]} newSteps The array of IStep objects to filter and map
 */
const convertCharacteristics = (
  newSteps: IStep[],
  situation: TDefaultValues
): ICharacteristicInput[] => {
  const characteristics = newSteps
    .filter(
      step =>
        step.type === 'characteristic' &&
        ((typeof step.answer === 'boolean' && step.answer) ||
          typeof step.answer === 'number' ||
          step.answer === 'unknown')
    )
    //If answer is boolean or number, add it with the key to an object
    .map(step => {
      const unknownAnswer = step.answers?.find(answer => answer.unknown)
      if (
        step.answer === 'unknown' &&
        unknownAnswer !== undefined &&
        unknownAnswer.values !== undefined
      ) {
        return {
          answer: unknownAnswer.values[situation],
          key: step.key,
        }
      } else if (
        typeof step.answer === 'number' ||
        typeof step.answer === 'boolean'
      ) {
        return {
          answer: step.answer,
          key: step.key,
        }
      }
      //Else, just return with the key
      return { key: step.key }
    })

  if (
    ['wheelchair', 'electricWheelchair'].includes(situation as TDefaultValues)
  ) {
    characteristics.push({ key: 'maxBedHeight', answer: 52 })
    characteristics.push({ key: 'minBedHeight', answer: 43 })
    characteristics.push({ key: 'maxWcSeatHeight', answer: 48 })
    characteristics.push({ key: 'minWcSeatHeight', answer: 44 })
  }
  
  const hygieneNeedsStep = newSteps.find(step => step.key === 'hygieneNeeds')

  if (hygieneNeedsStep !== null) {
    switch (hygieneNeedsStep?.answer) {
      case 'both':
        characteristics.push({ key: 'hasShower', answer: true })
        characteristics.push({ key: 'hasBathtub', answer: true })
        break
      case 'bath':
        characteristics.push({ key: 'hasBathtub', answer: true })
        break
      case 'shower':
        characteristics.push({ key: 'hasShower', answer: true })
        break
    }
  }
  return characteristics
}

export default convertCharacteristics
