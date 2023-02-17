/**
 * The external imports
 */
import { gql } from 'graphql-request'

/**
 * The internal imports
 */
import { api } from '../../api'

/**
 * Type imports
 */
import {
  ISlot,
  IDay,
  IPlanning,
  ICharacteristicInput,
  IPlanningPdf,
  IPlanningPdfInput,
} from '../../../types'

/**
 * Type definitions
 */
interface IPlanningInput {
  startDate: string
  endDate: string
  region: string
  characteristics: ICharacteristicInput[]
  categories: number[]
}

export const planningApi = api.injectEndpoints({
  endpoints: build => ({
    getPlanning: build.query<IPlanning, IPlanningInput>({
      query: ({ startDate, endDate, region, characteristics, categories }) => ({
        document: gql`
          query (
            $region: String!
            $startDate: String!
            $endDate: String!
            $categories: [ID!]
            $characteristics: [CharacteristicInput!]!
          ) {
            getPlanning(
              region: $region
              startDate: $startDate
              endDate: $endDate
              characteristics: $characteristics
              categories: $categories
            ) {
              accommodation {
                id
                name
                fullAddress
              }
              schedule {
                date
                activities {
                  id
                  name
                  fullAddress
                  pictureUrl
                  category {
                    section
                  }
                }
              }
            }
          }
        `,
        variables: { startDate, endDate, region, characteristics, categories },
      }),
      transformResponse: (response: { getPlanning: IPlanning }) => ({
        accommodation: response.getPlanning.accommodation,
        schedule: response.getPlanning.schedule.map((day: IDay) => ({
          ...day,
          activities: day.activities.map((activity: ISlot) => ({
            ...activity,
            type:
              activity.category?.section === 'restaurant'
                ? 'restaurant'
                : 'activity',
          })),
        })),
      }),
    }),
    getPlanningPdf: build.query<IPlanningPdf, IPlanningPdfInput>({
      query: planning => ({
        document: gql`
          query ($planning: JSON!) {
            getPlanningPdf(planning: $planning) {
              url
            }
          }
        `,
        variables: { planning },
      }),
      transformResponse: (response: { getPlanningPdf: IPlanningPdf }) =>
        response.getPlanningPdf,
    }),
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const { useLazyGetPlanningQuery, useLazyGetPlanningPdfQuery } =
  planningApi
