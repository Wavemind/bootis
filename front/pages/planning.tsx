/**
 * The external imports
 */
import { FC, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { HStack, Flex, StackDivider, Center, Spinner } from '@chakra-ui/react'

/**
 * The internal imports
 */
import {
  Page,
  SelectionModal,
  AccommodationBar,
  PlanningDay,
  AlertDialog,
} from '../components'
import { useAlertDialog, useModal } from '../lib/hooks'
import { AlertDialogContext, ModalContext } from '../lib/contexts'
import { AppDispatch, wrapper } from '../lib/store'
import { api } from '../lib/services/api'
import {
  getActivityCategories,
  getAccommodationCategories,
} from '../lib/services/modules/category'
import { getCuisine } from '../lib/services/modules/cuisine'

/**
 * Type imports
 */
import { IDay, ISlot } from '../lib/types'

const Planning: FC = () => {
  const { t } = useTranslation('planning')

  const [loading, setLoading] = useState(true)
  const [planningData, setPlanningData] = useState<IDay[]>([] as IDay[])
  const [accommodationData, setAccommodationData] = useState<ISlot>({} as ISlot)

  const { isModalOpen, openModal, closeModal, selectedDay } = useModal()
  const {
    isAlertDialogOpen,
    openAlertDialog,
    closeAlertDialog,
    alertDialogContent,
  } = useAlertDialog()

  useEffect(() => {
    const planningFromStorage = JSON.parse(
      localStorage.getItem('planning') as string
    )

    setAccommodationData(planningFromStorage.accommodation)
    setPlanningData(planningFromStorage.schedule)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Center h='full'>
        <Spinner size='xl' color='salmon' thickness='4px' />
      </Center>
    )
  }

  return (
    <Page title={t('title')} description={t('description')}>
      <AlertDialogContext.Provider
        value={{
          isAlertDialogOpen,
          openAlertDialog,
          closeAlertDialog,
          alertDialogContent,
        }}
      >
        <ModalContext.Provider
          value={{
            isModalOpen,
            openModal,
            closeModal,
            selectedDay,
            setPlanningData,
          }}
        >
          <Flex direction='column' color='black' h='full' w='full'>
            <HStack
              display='flex'
              alignItems='flex-start'
              border='1px solid white'
              h='full'
              borderRadius='lg'
              overflowY='scroll'
              divider={<StackDivider bg='blue' w={1} />}
            >
              {planningData.map((day, index) => (
                <PlanningDay
                  key={`day_${index}`}
                  dayIndex={index}
                  day={day}
                  setPlanningData={setPlanningData}
                />
              ))}
            </HStack>
            <AccommodationBar accommodationData={accommodationData} />
          </Flex>
          <SelectionModal />
          <AlertDialog />
        </ModalContext.Provider>
      </AlertDialogContext.Provider>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async ({ locale }) => {
    store.dispatch(getActivityCategories.initiate() as AppDispatch)
    store.dispatch(getAccommodationCategories.initiate() as AppDispatch)
    store.dispatch(getCuisine.initiate() as AppDispatch)
    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()))

    return {
      props: {
        ...(await serverSideTranslations(locale as string, [
          'common',
          'planning',
        ])),
        // Will be passed to the page component as props
      },
    }
  })

export default Planning
