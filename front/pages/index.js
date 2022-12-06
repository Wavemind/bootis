/**
 * The external imports
 */
import { Heading } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

/**
 * The internal imports
 */
import { Page } from '/components'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <Page title={t('title')}>
      <Heading as='h1'>{t('title')}</Heading>
    </Page>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
