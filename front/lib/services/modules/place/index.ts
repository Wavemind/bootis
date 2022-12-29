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
import { ISlot } from '../../../types'

/**
 * Type definitions
 */
interface IPlaceInput {
  region: string
  categories: number[]
}
interface IRestaurantInput {
  region: string
  cuisines: number[]
}

export const placeApi = api.injectEndpoints({
  endpoints: build => ({
    getPlaces: build.query<ISlot[], IPlaceInput>({
      query: ({ region, categories }) => ({
        document: gql`
          query ($region: String!, $categories: [ID!]) {
            getPlaces(region: $region, categories: $categories) {
              id
              name
              fullAddress
              pictureUrl
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
        `,
        variables: { region, categories },
      }),
      transformResponse: (response: { getPlaces: ISlot[] }) => {
        return response.getPlaces.map(place => ({
          ...place,
          type:
            place.category?.section === 'restaurant'
              ? 'restaurant'
              : 'activity',
        }))
      },
      providesTags: [],
    }),
    getRestaurants: build.query<ISlot[], IRestaurantInput>({
      query: ({ region, cuisines }) => ({
        document: gql`
          query ($region: String!, $cuisines: [ID!]) {
            getRestaurants(region: $region, cuisines: $cuisines) {
              id
              name
              fullAddress
              pictureUrl
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
        `,
        variables: { region, cuisines },
      }),
      transformResponse: (response: { getRestaurants: ISlot[] }) =>
        response.getRestaurants,
      providesTags: [],
    }),
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const { useLazyGetPlacesQuery, useLazyGetRestaurantsQuery } = placeApi
