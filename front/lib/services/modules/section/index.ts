/**
 * The internal imports
 */
import { api } from '../../api'
import { gql } from 'graphql-request'

/**
 * Type definitions
 */
import { IEnumOption } from '../../../types'

export const sectionsApi = api.injectEndpoints({
  endpoints: build => ({
    getSections: build.query<IEnumOption[], void>({
      query: () => ({
        document: gql`
          query {
            getSections {
              id
              name
            }
          }
        `,
      }),
      transformResponse: (response: { getSections: IEnumOption[] }) =>
        response.getSections,
      providesTags: [],
    }),
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const { useGetSectionsQuery } = sectionsApi

// Export endpoints for use in SSR
export const { getSections } = sectionsApi.endpoints
