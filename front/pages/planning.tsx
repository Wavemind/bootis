/**
 * The external imports
 */
import { FC, useMemo } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { HStack, Flex, StackDivider } from '@chakra-ui/react'

/**
 * The internal imports
 */
import {
  Page,
  SelectionModal,
  AccommodationBar,
  PlanningDay,
} from '../components'
import { useModal } from '../lib/hooks'
import { ModalContext } from '../lib/contexts'

/**
 * Type definitions
 */

const Planning: FC = () => {
  const { t } = useTranslation('planning')

  const { isModalOpen, openModal, closeModal, selectedCategory } = useModal()

  // TODO : Get this from the backend and then adapt to data structure
  const planningData = useMemo(() => {
    return [
      {
        date: '29.03.2023',
        schedule: [
          {
            type: 'activity',
            label: "Bibliothèque d'art et d'archéologie",
            address: 'Promenade du Pin 5, 1204 Geneve',
            signs: [
              'noHandicappedParking',
              'handicappedWC',
              'noWheelchair',
              'accompaniedWheelchair',
            ],
          },
          {
            type: 'restaurant',
            label: 'Green Up Salad bar',
            address: 'Rue Marterey 1, 1005 Lausanne',
            signs: ['noHandicappedParking', 'handicappedWC', 'noWheelchair'],
          },
          {
            type: 'activity',
            label: 'Bowling de Vidy',
            address: 'Route de Chavannes 27 D, 1007 Lausanne-CH',
            signs: [
              'noHandicappedParking',
              'handicappedWC',
              'noWheelchair',
              'accompaniedWheelchair',
            ],
          },
          {
            type: 'restaurant',
            label: 'Bleu Lézard',
            address: 'Rue Enning 10, 1003 Lausanne',
            signs: ['noHandicappedParking', 'handicappedWC', 'noWheelchair'],
          },
        ],
      },
      {
        date: '30.03.2023',
        schedule: [
          {
            type: 'activity',
            label: 'Bains de Lavey',
            address:
              'Route des Bains 42 Les Bains de Lavey, 1892 Lavey-les-bains',
            signs: ['noHandicappedParking'],
          },
          {
            type: 'restaurant',
            label: 'Café de Bouchers',
            address: 'Av. du Chablais 21, 1008 Prilly',
            signs: ['noHandicappedParking', 'handicappedWC', 'noWheelchair'],
          },
          {
            type: 'activity',
            label: 'Cinéma de Malley',
            address: 'Chem. du Viaduc 1, 1008 Prilly',
            signs: ['noHandicappedParking', 'accompaniedWheelchair'],
          },
        ],
      },
    ]
  }, [])

  return (
    <Page title={t('title')} description={t('description')}>
      <ModalContext.Provider
        value={{ isModalOpen, openModal, closeModal, selectedCategory }}
      >
        <Flex direction='column' color='black' h='full' w='full' gap={4}>
          <HStack
            alignItems='flex-start'
            border='1px solid white'
            h='full'
            borderRadius='lg'
            p={4}
            overflowY='scroll'
            divider={<StackDivider bg='blue' w={1} height='100%' />}
          >
            {planningData.map(day => (
              <PlanningDay key={day.date} day={day} />
            ))}
          </HStack>
          <AccommodationBar />
        </Flex>
        <SelectionModal />
      </ModalContext.Provider>
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'common',
        'planning',
      ])),
    },
  }
}

export default Planning
