/**
 * The external imports
 */
import { TFunction } from 'next-i18next'

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
export default (t: TFunction) =>
  <ICharacteristics>{
    maxSlope: {
      id: 1,
      key: 'maxSlope',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('until', { value: '7%' }),
          value: 7,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('until', { value: '15%' }),
          value: 15,
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '15%' }),
          value: 100,
          children: [],
          excludes: [],
        },
        {
          id: 4,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: 7,
            electricWheelchair: 14,
            scooter: 14,
            cane: 14,
          },
          children: [],
          excludes: [],
        },
      ],
    },
    passageLength: {
      id: 21,
      key: 'passageLength',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('below', { value: '120 cm' }),
          value: 0,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('minimum', { value: '120 cm' }),
          value: 120,
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('minimum', { value: '137 cm' }),
          value: 137,
          children: [],
          excludes: [],
        },
        {
          id: 4,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: 137,
            electricWheelchair: 137,
            scooter: 120,
            cane: null,
          },
          children: [],
          excludes: [],
        },
      ],
    },
    passageWidth: {
      id: 2,
      key: 'passageWidth',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('at_least', { value: '60 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('at_least', { value: '80 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('at_least', { value: '110 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 4,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: 76,
            electricWheelchair: 76,
            scooter: 76,
            cane: null,
          },
          children: [],
          excludes: [],
        },
      ],
    },
    stepHeight: {
      id: 3,
      key: 'stepHeight',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('below', { value: '3.5 cm' }),
          children: [],
          excludes: [],
          value: 3.5,
        },
        {
          id: 2,
          label: t('below', { value: '6 cm' }),
          value: 6,
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '6 cm' }),
          value: 1000,
          children: [],
          excludes: [],
        },
        {
          id: 4,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: 3.5,
            electricWheelchair: 6,
            scooter: 3.5,
            cane: 1000,
          },
          children: [],
          excludes: [],
        },
      ],
    },
    tableHeight: {
      id: 4,
      key: 'tableHeight',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('at_least', { value: '70 cm' }),
          value: 70,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('at_least', { value: '85 cm' }),
          value: 85,
          children: [],
          excludes: [],
        },
        {
          id: 3,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: 68,
            electricWheelchair: 68,
            scooter: null,
            cane: null,
          },
          children: [],
          excludes: [],
        },
      ],
    },
    reachHeight: {
      id: 5,
      key: 'reachHeight',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('below', { value: '123 cm' }),
          value: 123,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('above', { value: '123 cm' }),
          value: 1000,
          children: [],
          excludes: [],
        },
        {
          id: 3,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: 123,
            electricWheelchair: 123,
            scooter: 1000,
            cane: 1000,
          },
          children: [],
          excludes: [],
        },
      ],
    },
    handrail: {
      id: 6,
      key: 'handrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('yes'),
          value: true,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('no'),
          value: false,
          children: [],
          excludes: [],
        },
      ],
    },
    bedAdjacentSpace: {
      id: 8,
      key: 'bedAdjacentSpace',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('below', { value: '90 cm' }),
          value: 0,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('above', { value: '90 cm' }),
          value: 90,
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '130 cm' }),
          value: 130,
          children: [],
          excludes: [],
        },
        {
          id: 4,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: 130,
            electricWheelchair: 130,
            scooter: null,
            cane: null,
          },
          children: [],
          excludes: [],
        },
      ],
    },
    wcAdjacentDistance: {
      id: 9,
      key: 'wcAdjacentDistance',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('below', { value: '75 cm' }),
          value: 0,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('above', { value: '75 cm' }),
          value: 75,
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '83 cm' }),
          value: 83,
          children: [],
          excludes: [],
        },
        {
          id: 4,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: 83,
            electricWheelchair: 83,
            scooter: null,
            cane: null,
          },
          children: [],
          excludes: [],
        },
      ],
    },
    wcFrontDistance: {
      id: 10,
      key: 'wcFrontDistance',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('below', { value: '80 cm' }),
          value: 0,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('above', { value: '80 cm' }),
          value: 80,
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '110 cm' }),
          value: 110,
          children: [],
          excludes: [],
        },
        {
          id: 4,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: 107,
            electricWheelchair: 107,
            scooter: null,
            cane: null,
          },
          children: [],
          excludes: [],
        },
      ],
    },
    wcFixedHandrail: {
      id: 12,
      key: 'wcFixedHandrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('yes'),
          value: true,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('no'),
          value: false,
          children: [],
          excludes: [],
        },
      ],
    },
    wcFoldableHandrail: {
      id: 13,
      key: 'wcFoldableHandrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('yes'),
          value: true,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('no'),
          value: false,
          children: [],
          excludes: [],
        },
      ],
    },
    eurokey: {
      id: 14,
      key: 'eurokey',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('yes'),
          value: true,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('no'),
          value: false,
          children: [],
          excludes: [],
        },
      ],
    },
    wcSinkDistance: {
      id: 15,
      key: 'wcSinkDistance',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('below', { value: '44 cm' }),
          value: 44,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('below', { value: '48 cm' }),
          value: 48,
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '48 cm' }),
          value: 1000,
          children: [],
          excludes: [],
        },
        {
          id: 4,
          unknown: true,
          label: t('unknown'),
          values: {
            wheelchair: null,
            electricWheelchair: null,
            scooter: null,
            cane: null,
          },
          children: [],
          excludes: [],
        },
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
          label: t('shower'),
          children: ['showerFixedHandrail', 'showerFoldableHandrail'],
          excludes: ['bathSeat'],
        },
        {
          id: 2,
          label: t('bath'),
          children: ['bathSeat'],
          excludes: ['showerFixedHandrail', 'showerFoldableHandrail'],
        },
        {
          id: 3,
          label: t('both'),
          children: [
            'showerFixedHandrail',
            'showerFoldableHandrail',
            'bathSeat',
          ],
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
        {
          id: 1,
          label: t('yes'),
          value: true,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('no'),
          value: false,
          children: [],
          excludes: [],
        },
      ],
    },
    showerFixedHandrail: {
      id: 19,
      key: 'showerFixedHandrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('yes'),
          value: true,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('no'),
          value: false,
          children: [],
          excludes: [],
        },
      ],
    },
    showerFoldableHandrail: {
      id: 20,
      key: 'showerFoldableHandrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('yes'),
          value: true,
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('no'),
          value: false,
          children: [],
          excludes: [],
        },
      ],
    },
  }
