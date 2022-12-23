/**
 * The external imports
 */
import { gql } from 'graphql-request'
import { i18n } from 'next-i18next'

/**
 * The internal imports
 */
import { api } from '../../api'

/**
 * Type imports
 */
import { IEnumOption } from '../../../types'

export const regionsApi = api.injectEndpoints({
  endpoints: build => ({
    getRegions: build.query<IEnumOption[], void>({
      query: () => ({
        document: gql`
          query {
            getRegions {
              id
              name
            }
          }
        `,
      }),
      transformResponse: (response: { getRegions: IEnumOption[] }) =>
        response.getRegions.map(region => ({
          ...region,
          label: i18n?.t(`regions.${region.name}`, { ns: 'common' }) || null,
        })),
      providesTags: [],
    }),
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const { useGetRegionsQuery } = regionsApi

// Export endpoints for use in SSR
export const { getRegions } = regionsApi.endpoints
