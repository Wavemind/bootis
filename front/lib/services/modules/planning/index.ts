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
import { ISlot, IDay } from '../../../types'

/**
 * Type definitions
 */
interface IPlanning {
  accommodation: ISlot
  schedule: IDay[]
}

interface IPlanningInput {
  startDate: Date
  endDate: Date
  region: string
  categories: number[]
}

export const planningApi = api.injectEndpoints({
  endpoints: build => ({
    getPlanning: build.query<IPlanning, IPlanningInput>({
      query: ({ startDate, endDate, region, categories }) => ({
        document: gql`
          query (
            $region: String!
            $startDate: ISO8601Date!
            $endDate: ISO8601Date!
          ) {
            getPlanning(
              region: $region
              startDate: $startDate
              endDate: $endDate
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
                  pictograms {
                    linkSvg
                    link
                    name
                  }
                  category {
                    section
                  }
                }
              }
            }
          }
        `,
        variables: { startDate, endDate, region, categories },
      }),
      transformResponse: (response: { getPlanning: IPlanning }) =>
        response.getPlanning,
      providesTags: [],
    }),
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const { useLazyGetPlanningQuery } = planningApi
