/**
 * The external imports
 */
import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { ClientError } from 'graphql-request'
import { HYDRATE } from 'next-redux-wrapper'

// https://stackoverflow.com/questions/74101408/mismatch-of-types-for-rtk-query-graphql-request-and-graphql-request
const baseQuery = graphqlRequestBaseQuery<
  Partial<ClientError> & { statusCode: number; error: string }
>({
  url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  prepareHeaders: headers => {
    return headers
  },
  customErrors: ({ name, stack, response }) => {
    const {
      message = '',
      statusCode = 500,
      error = '',
    } = response?.errors?.length ? response.errors[0].extensions.response : {}

    return {
      name,
      message,
      statusCode,
      error,
      stack,
    }
  },
})

export const api = createApi({
  baseQuery,
  refetchOnMountOrArgChange: 10,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({}),
  tagTypes: [],
})
