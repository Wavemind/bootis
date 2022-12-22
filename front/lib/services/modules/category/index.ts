/**
 * The internal imports
 */
import { api } from '../../api'
import { gql } from 'graphql-request'

/**
 * Type imports
 */
import { IEnumOption } from '../../../types'

export const categoriesApi = api.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query<IEnumOption[], string>({
      query: region => ({
        document: gql`
          query ($region: string!) {
            getCategories(region: $region) {
              id
            }
          }
        `,
        variables: { region },
      }),
      transformResponse: (response: { getCategories: IEnumOption[] }) =>
        response.getCategories,
      providesTags: [],
    }),
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const { useLazyGetCategoriesQuery } = categoriesApi
