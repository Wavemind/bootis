/**
 * The external imports
 */
import { FC, useCallback, useEffect, useState, useMemo } from 'react'
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
  PlanningDay,
  AlertDialog,
  AccommodationInfo,
  SearchInfo,
} from '../components'
import { useAlertDialog, useModal } from '../lib/hooks'
import { AlertDialogContext, ModalContext } from '../lib/contexts'
import { AppDispatch, wrapper } from '../lib/store'
import { api } from '../lib/services/api'
import {
  getActivityCategories,
  getAccommodationCategories,
} from '../lib/services/modules/category'
import { useLazyGetPlanningQuery } from '../lib/services/modules/planning'
import { getCuisine } from '../lib/services/modules/cuisine'
import { readVoyageFormData } from '../lib/utils/readVoyageFormData'

/**
 * Type imports
 */
import { IDay, ISlot, IElement, IPlanning } from '../lib/types'
import { isEmpty } from 'lodash'

const Planning: FC = () => {
  const { t } = useTranslation('planning')

  const [loading, setLoading] = useState(true)
  const [planningData, setPlanningData] = useState<IDay[]>([] as IDay[])
  const [accommodationData, setAccommodationData] = useState<ISlot>({} as ISlot)

  const { isModalOpen, openModal, closeModal, selectedDay, modalType } =
    useModal()

  const {
    isAlertDialogOpen,
    openAlertDialog,
    closeAlertDialog,
    alertDialogContent,
  } = useAlertDialog()

  const [getPlanning, { data = {} as IPlanning, isSuccess, isFetching }] =
    useLazyGetPlanningQuery()

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => readVoyageFormData(), [])

  /**
   * Regenerates a new plan
   */
  const handleRegenerate = useCallback(() => {
    openAlertDialog({
      title: t('regenerateDialogTitle'),
      content: t('regenerateDialogContent'),
      action: () => {
        localStorage.removeItem('planning')
        setLoading(true)
        getPlanning({
          startDate: voyageFormData.startDate,
          endDate: voyageFormData.endDate,
          region: voyageFormData.destination?.name || '',
          categories:
            voyageFormData.activities?.map(
              (activity: IElement) => activity.id
            ) || [],
        })
      },
      confirmColor: 'teal',
      confirmLabel: t('yes'),
    })
  }, [])

  /**
   * Update the localStorage when the planning data or the accommodation data change
   */
  useEffect(() => {
    if (planningData.length > 0 || !isEmpty(accommodationData)) {
      localStorage.setItem(
        'planning',
        JSON.stringify({
          accommodation: accommodationData,
          schedule: planningData,
        })
      )
    }
  }, [planningData, accommodationData])

  /**
   * If the planning is properly received from the backend,
   * put it in localStorage and set loading to false
   */
  useEffect(() => {
    if (!isFetching && isSuccess) {
      localStorage.setItem('planning', JSON.stringify(data))
      setAccommodationData(data.accommodation)
      setPlanningData(data.schedule)
      setLoading(false)
    }
  }, [isSuccess, isFetching])

  /**
   * Gets planning data from localstorage
   */
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
            setAccommodationData,
            modalType,
          }}
        >
          <HStack w='full' spacing={8} p={3} alignItems='flex-start'>
            <AccommodationInfo data={accommodationData} />
            <SearchInfo handleRegenerate={handleRegenerate} />
          </HStack>
          <Flex
            direction='column'
            gap={3}
            h='full'
            w='fit-content'
            px={3}
            mt={8}
            overflow='hidden'
          >
            <HStack
              display='flex'
              alignItems='flex-start'
              h='full'
              w='full'
              borderRadius='lg'
              overflowY='auto'
              divider={<StackDivider bg='blue' w={1} />}
              mx={2}
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
