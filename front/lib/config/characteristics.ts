/**
 * The internal imports
 */
import maxSlopeImage from '../../public/maxSlopeImage.svg'

/**
 * Type definitions
 */
import { ICharacteristics } from '../types'

// TODO : Update all of the images onces we have them
// TODO : Recheck Id match with api
export default <ICharacteristics>{
  maxSlope: {
    id: 1,
    key: 'maxSlope',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: "Jusqu'a 6%", children: [], excludes: [] },
      { id: 2, label: "Jusqu'a 12%", children: [], excludes: [] },
      { id: 3, label: 'Plus de 12%', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  passageLength: {
    id: 21,
    key: 'passageLength',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 137 cm', children: [], excludes: [] },
      { id: 2, label: 'Plus de 137 cm', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  passageWidth: {
    id: 2,
    key: 'passageWidth',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Plus de 110 cm', children: [], excludes: [] },
      { id: 2, label: 'Entre 80 cm et 110 cm', children: [], excludes: [] },
      { id: 3, label: 'Moins de 80 cm', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  stepHeight: {
    id: 3,
    key: 'stepHeight',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 3.5 cm', children: [], excludes: [] },
      { id: 2, label: 'Entre 3.5 cm et 6 cm', children: [], excludes: [] },
      { id: 3, label: 'Plus de 6 cm', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  tableHeight: {
    id: 4,
    key: 'tableHeight',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 70 cm', children: [], excludes: [] },
      { id: 2, label: 'Entre 70 cm et 85 cm', children: [], excludes: [] },
      { id: 3, label: 'Plus de 85 cm', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  reachHeight: {
    id: 5,
    key: 'reachHeight',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 123 cm', children: [], excludes: [] },
      { id: 2, label: 'Plus de 123 cm', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  handrail: {
    id: 6,
    key: 'handrail',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Oui', children: [], excludes: [] },
      { id: 2, label: 'Non', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  bedHeight: {
    id: 7,
    key: 'bedHeight',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 43 cm', children: [], excludes: [] },
      { id: 2, label: 'Entre 43 cm et 52 cm', children: [], excludes: [] },
      { id: 3, label: 'Plus de 52 cm', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  bedAdjacentSpace: {
    id: 8,
    key: 'bedAdjacentSpace',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 90 cm', children: [], excludes: [] },
      { id: 2, label: 'Entre 90 cm et 130 cm', children: [], excludes: [] },
      { id: 3, label: 'Plus de 130 cm', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  wcAdjacentDistance: {
    id: 9,
    key: 'wcAdjacentDistance',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 75 cm', children: [], excludes: [] },
      { id: 2, label: 'Entre 75 cm et 83 cm', children: [], excludes: [] },
      { id: 3, label: 'Plus de 83 cm', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  wcFrontDistance: {
    id: 10,
    key: 'wcFrontDistance',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 80 cm', children: [], excludes: [] },
      { id: 2, label: 'Entre 80 cm et 110 cm', children: [], excludes: [] },
      { id: 3, label: 'Plus de 110 cm', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  wcSeatHeight: {
    id: 11,
    key: 'wcSeatHeight',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 44 cm', children: [], excludes: [] },
      { id: 2, label: 'Entre 44 cm et 48 cm', children: [], excludes: [] },
      { id: 3, label: 'Plus de 48 cm', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  wcFixedHandrail: {
    id: 12,
    key: 'wcFixedHandrail',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Oui', children: [], excludes: [] },
      { id: 2, label: 'Non', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  wcFoldableHandrail: {
    id: 13,
    key: 'wcFoldableHandrail',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Oui', children: [], excludes: [] },
      { id: 2, label: 'Non', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  eurokey: {
    id: 14,
    key: 'eurokey',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Oui', children: [], excludes: [] },
      { id: 2, label: 'Non', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  wcSinkDistance: {
    id: 15,
    key: 'wcSinkDistance',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Moins de 44 cm', children: [], excludes: [] },
      { id: 2, label: 'Entre 44 cm et 48 cm', children: [], excludes: [] },
      { id: 3, label: 'Plus de 48 cm', children: [], excludes: [] },
      { id: 4, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  hygieneNeeds: {
    id: 22,
    key: 'hygieneNeeds',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      {
        id: 1,
        label: "J'ai besoin d'une douche",
        children: ['showerFixedHandrail', 'showerFoldableHandrail'],
        excludes: ['bathSeat'],
      },
      {
        id: 2,
        label: "J'ai besoin d'une baignoire",
        children: ['bathSeat'],
        excludes: ['showerFixedHandrail', 'showerFoldableHandrail'],
      },
      {
        id: 3,
        label: 'Les deux sont possibles',
        children: ['showerFixedHandrail', 'showerFoldableHandrail', 'bathSeat'],
        excludes: [],
      },
    ],
  },
  bathSeat: {
    id: 18,
    key: 'bathSeat',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Oui', children: [], excludes: [] },
      { id: 2, label: 'Non', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  showerFixedHandrail: {
    id: 19,
    key: 'showerFixedHandrail',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Oui', children: [], excludes: [] },
      { id: 2, label: 'Non', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  showerFoldableHandrail: {
    id: 20,
    key: 'showerFoldableHandrail',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Oui', children: [], excludes: [] },
      { id: 2, label: 'Non', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
}
