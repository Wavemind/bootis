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
          label: t('until', { value: '6%' }),
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('until', { value: '12%' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '12%' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
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
          label: t('below', { value: '37 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('above', { value: '37 cm' }),
          children: [],
          excludes: [],
        },
        { id: 3, label: t('unknown'), children: [], excludes: [] },
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
          label: t('above', { value: '110 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('between', { from: '80 cm', to: '110 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('below', { value: '80 cm' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
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
        },
        {
          id: 2,
          label: t('between', { from: '3.5 cm', to: '6 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '6 cm' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
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
          label: t('below', { value: '70 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('between', { from: '70 cm', to: '85 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '85 cm' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
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
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('above', { value: '123 cm' }),
          children: [],
          excludes: [],
        },
        { id: 3, label: t('unknown'), children: [], excludes: [] },
      ],
    },
    handrail: {
      id: 6,
      key: 'handrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        { id: 1, label: t('yes'), children: [], excludes: [] },
        { id: 2, label: t('no'), children: [], excludes: [] },
        { id: 3, label: t('unknown'), children: [], excludes: [] },
      ],
    },
    bedHeight: {
      id: 7,
      key: 'bedHeight',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('below', { value: '43 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('between', { from: '43 cm', to: '52 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '52 cm' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
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
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('between', { from: '90 cm', to: '130 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '130 cm' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
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
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('between', { from: '75 cm', to: '83 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '83 cm' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
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
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('between', { from: '80 cm', to: '110 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '110 cm' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
      ],
    },
    wcSeatHeight: {
      id: 11,
      key: 'wcSeatHeight',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        {
          id: 1,
          label: t('below', { value: '44 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('between', { from: '44 cm', to: '48 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '48 cm' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
      ],
    },
    wcFixedHandrail: {
      id: 12,
      key: 'wcFixedHandrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        { id: 1, label: t('yes'), children: [], excludes: [] },
        { id: 2, label: t('no'), children: [], excludes: [] },
        { id: 3, label: t('unknown'), children: [], excludes: [] },
      ],
    },
    wcFoldableHandrail: {
      id: 13,
      key: 'wcFoldableHandrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        { id: 1, label: t('yes'), children: [], excludes: [] },
        { id: 2, label: t('no'), children: [], excludes: [] },
        { id: 3, label: t('unknown'), children: [], excludes: [] },
      ],
    },
    eurokey: {
      id: 14,
      key: 'eurokey',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        { id: 1, label: t('yes'), children: [], excludes: [] },
        { id: 2, label: t('no'), children: [], excludes: [] },
        { id: 3, label: t('unknown'), children: [], excludes: [] },
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
          children: [],
          excludes: [],
        },
        {
          id: 2,
          label: t('between', { from: '44 cm', to: '48 cm' }),
          children: [],
          excludes: [],
        },
        {
          id: 3,
          label: t('above', { value: '48 cm' }),
          children: [],
          excludes: [],
        },
        { id: 4, label: t('unknown'), children: [], excludes: [] },
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
        { id: 1, label: t('yes'), children: [], excludes: [] },
        { id: 2, label: t('no'), children: [], excludes: [] },
        { id: 3, label: t('unknown'), children: [], excludes: [] },
      ],
    },
    showerFixedHandrail: {
      id: 19,
      key: 'showerFixedHandrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        { id: 1, label: t('yes'), children: [], excludes: [] },
        { id: 2, label: t('no'), children: [], excludes: [] },
        { id: 3, label: t('unknown'), children: [], excludes: [] },
      ],
    },
    showerFoldableHandrail: {
      id: 20,
      key: 'showerFoldableHandrail',
      imageSrc: maxSlopeImage,
      type: 'characteristic',
      answers: [
        { id: 1, label: t('yes'), children: [], excludes: [] },
        { id: 2, label: t('no'), children: [], excludes: [] },
        { id: 3, label: t('unknown'), children: [], excludes: [] },
      ],
    },
  }
