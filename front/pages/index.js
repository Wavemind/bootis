/**
 * The external imports
 */
import { Heading } from '@chakra-ui/react'

/**
 * The internal imports
 */
import { Page } from '/components'

export default function Home() {
  return (
    <Page
      title='Bootis'
      description='The application for roaming disabled people'
    >
      <Heading as='h1'>Bootis</Heading>
    </Page>
  )
}
