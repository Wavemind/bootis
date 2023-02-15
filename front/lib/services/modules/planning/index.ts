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
import { ISlot, IDay, IPlanning } from '../../../types'

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

interface ICharacteristicInput {
  answer?: number | boolean
  key: string
}

export const planningApi = api.injectEndpoints({
  endpoints: build => ({
    getPlanning: build.query<IPlanning, IPlanningInput>({
      query: ({ startDate, endDate, region, characteristics, categories }) => ({
        document: gql`
          {
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
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const { useLazyGetPlanningQuery } = planningApi
