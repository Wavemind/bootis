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
import { IEnumOption } from '../../../types'

export const cuisinesApi = api.injectEndpoints({
  endpoints: build => ({
    getCuisine: build.query<IEnumOption[], void>({
      query: () => ({
        document: gql`
          query {
            getCuisine {
              id
              name
              label
            }
          }
        `,
      }),
      transformResponse: (response: { getCuisine: IEnumOption[] }) =>
        response.getCuisine,
    }),
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const { useGetCuisineQuery } = cuisinesApi

// Export endpoints for use in SSR
export const { getCuisine } = cuisinesApi.endpoints
