/**
 * The external imports
 */
import { gql } from 'graphql-request'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import type { IEnumOption } from '../../../types'

export default (build: EndpointBuilder<any, any, any>) => ({
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
  }),
})
