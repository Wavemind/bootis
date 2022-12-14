import maxSlopeImage from '../../public/maxSlopeImage.svg'

// TODO : Update all of the images onces we have them
export default {
  maxSlope: {
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
    key: 'passageLength',
    imageSrc: maxSlopeImage,
    answers: [
      { id: 1, label: 'Moins de 137 cm', children: [], excludes: [] },
      { id: 2, label: 'Plus de 137 cm', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  passageWidth: {
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
  showerFixedHandrail: {
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
    key: 'showerFoldableHandrail',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Oui', children: [], excludes: [] },
      { id: 2, label: 'Non', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
  bathSeat: {
    key: 'bathSeat',
    imageSrc: maxSlopeImage,
    type: 'characteristic',
    answers: [
      { id: 1, label: 'Oui', children: [], excludes: [] },
      { id: 2, label: 'Non', children: [], excludes: [] },
      { id: 3, label: 'Je ne sais pas !', children: [], excludes: [] },
    ],
  },
}
