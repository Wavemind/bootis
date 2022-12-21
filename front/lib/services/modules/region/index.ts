/**
 * The internal imports
 */
import { api } from '../../api'
import getRegionsQuery from './getRegions'

export const algorithmsApi = api.injectEndpoints({
  endpoints: build => ({
    getRegions: getRegionsQuery(build),
  }),
  overrideExisting: false,
})

// Export hooks for usage in functional components
export const { useGetRegionsQuery } = algorithmsApi
