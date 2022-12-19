/**
 * The external imports
 */
import { useMemo, useState, useEffect, FC } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  Box,
  HStack,
  SimpleGrid,
  Flex,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  StackDivider,
} from '@chakra-ui/react'
import { Select, chakraComponents, ControlProps } from 'chakra-react-select'
import { BsSearch } from 'react-icons/bs'

/**
 * The internal imports
 */
import {
  Page,
  SelectionModal,
  AccommodationBar,
  PlanningDay,
} from '../components'
import accommodationTypes from '../lib/config/accommodationTypes'
import restaurantTypes from '../lib/config/restaurantTypes'
import activities from '../lib/config/activities'
import { useModal } from '../lib/hooks'
import { ModalContext } from '../lib/contexts'

/**
 * Type definitions
 */

const Planning: FC = () => {
  const { t } = useTranslation('planning')

  const { isModalOpen, openModal, closeModal, category } = useModal()

  /**
   * If data exists in localStorage, use it to prefill form values
   */
  useEffect(() => {
    if (localStorage.getItem('voyage') !== null) {
      const infoFromVoyage = JSON.parse(
        localStorage.getItem('voyage') as string
      )
      console.log(infoFromVoyage)
      // const defaultValues = {
      //   startDate: new Date(infoFromSearch.startDate),
      //   endDate: new Date(infoFromSearch.endDate),
      //   destination: regions.find(
      //     region => region.id === infoFromSearch.destination
      //   ),
      //   activities: [
      //     activities.find(activity => activity.id === infoFromSearch.activity),
      //   ],
      //   accommodation: '',
      //   restaurants: [],
      // }
    }
  }, [])

  // TODO : Content for cards ?
  // TODO : Content for planning ?
  return (
    <Page title={t('title')} description={t('description')}>
      <ModalContext.Provider
        value={{ isModalOpen, openModal, closeModal, category }}
      >
        <Flex direction='column' color='black' h='full' w='full' gap={4}>
          <HStack
            alignItems='flex-start'
            border='1px solid white'
            h='full'
            borderRadius='lg'
            p={4}
            overflowY='scroll'
            bg='pink'
            divider={<StackDivider bg='blue' w={1} />}
          >
            <PlanningDay />
            <PlanningDay />
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
