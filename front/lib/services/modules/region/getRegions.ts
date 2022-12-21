/**
 * The external imports
 */
import { gql } from 'graphql-request'

type RegionType = {
  id: number
  label: string
}

type RegionResponse = {
  getRegions: RegionType
}

export default (build: {
  query: (arg0: {
    query: () => { document: string }
    transformResponse: (response: RegionResponse) => RegionType
    providesTags: string[]
  }) => any
}) =>
  build.query({
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
    transformResponse: (response: RegionResponse) => response.getRegions,
    providesTags: [],
  })
