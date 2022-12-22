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
    getCategoriesByRegion: build.query<number[], string>({
      query: region => ({
        document: gql`
          query ($region: String!) {
            getCategoriesByRegion(region: $region) {
              id
            }
          }
        `,
        variables: { region },
      }),
      transformResponse: (response: { getCategoriesByRegion: IEnumOption[] }) =>
        response.getCategoriesByRegion.map(category => category.id),
      providesTags: [],
    }),
    getActivityCategories: build.query<IEnumOption[], void>({
      query: () => ({
        document: gql`
          query {
            getActivityCategories {
              id
              name
            }
          }
        `,
      }),
      transformResponse: (response: { getActivityCategories: IEnumOption[] }) =>
        response.getActivityCategories.map(category => ({
          ...category,
          label: category.name,
        })),
      providesTags: [],
    }),
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const {
  useLazyGetCategoriesByRegionQuery,
  useGetActivityCategoriesQuery,
} = categoriesApi

export const { getActivityCategories } = categoriesApi.endpoints
