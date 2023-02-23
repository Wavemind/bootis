/**
 * The external imports
 */
import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  HStack,
  Flex,
  StackDivider,
  Center,
  Spinner,
  Button,
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Grid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

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
  LoadingText,
  Link,
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
import { IDay, ISlot, IElement, IPlanning, TDefaultValues } from '../lib/types'
import { isEmpty } from 'lodash'
import convertCharacteristics from '../lib/utils/convertCharacteristics'

const Planning: FC = () => {
  const { t } = useTranslation('planning')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [loading, setLoading] = useState(true)
  const [planningData, setPlanningData] = useState<IDay[]>([] as IDay[])
  const [accommodationData, setAccommodationData] = useState<ISlot>({} as ISlot)

  const { isModalOpen, openModal, closeModal, selectedDay, modalType } =
    useModal()

  const cancelRef = useRef(null)

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
        const newSteps = JSON.parse(localStorage.getItem('steps') as string)
        const situation = newSteps[0].answer

        getPlanning({
          startDate: voyageFormData.startDate,
          endDate: voyageFormData.endDate,
          region: voyageFormData.destination?.name || '',
          categories:
            voyageFormData.activities?.map(
              (activity: IElement) => activity.id
            ) || [],
          characteristics: convertCharacteristics(
            newSteps,
            situation as TDefaultValues
          ),
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

  /**
   * Opens the survey dialog after 60 seconds of being on the page
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      onOpen()
    }, 60000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Center display='flex' flexDirection='column' flex={1} h='full'>
        <Spinner size='xl' color='salmon' thickness='4px' mb={10} />
        <LoadingText timer={0} text={t('loading_1', { ns: 'voyage' })} />
        <LoadingText timer={4500} text={t('loading_2', { ns: 'voyage' })} />
        <LoadingText timer={9000} text={t('loading_3', { ns: 'voyage' })} />
        <LoadingText timer={13000} text={t('loading_4', { ns: 'voyage' })} />
      </Center>
    )
  }

  // TODO : Get the link for the Votre Avis form
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
          <Flex
            direction='column'
            gap={3}
            h='full'
            w='fit-content'
            px={3}
            mt={8}
            minWidth='100%'
            overflow='auto'
          >
            <Accordion allowToggle>
              <AccordionItem border='none'>
                {({ isExpanded }) => (
                  <React.Fragment>
                    <AccordionButton
                      boxShadow='lg'
                      borderRadius='lg'
                      justifyContent='space-between'
                      py={3}
                      color='white'
                      fontSize='lg'
                      bg='blue'
                      _hover={{
                        bg: 'blueHover',
                      }}
                    >
                      {isExpanded ? t('seeLess') : t('seeMore')}
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={1}>
                      <Grid templateColumns='repeat(4, 1fr)' gap={8}>
                        <AccommodationInfo data={accommodationData} />
                        <SearchInfo handleRegenerate={handleRegenerate} />
                      </Grid>
                    </AccordionPanel>
                  </React.Fragment>
                )}
              </AccordionItem>
            </Accordion>
            <HStack
              display='flex'
              alignItems='flex-start'
              h='full'
              w='full'
              borderRadius='lg'
              overflowY='auto'
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
          </Flex>
          <SelectionModal />
          <AlertDialog />
        </ModalContext.Provider>
      </AlertDialogContext.Provider>
      <ChakraAlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='lg'
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize='lg'
              fontWeight='bold'
              textAlign='center'
            >
              {t('opinion.title')}
            </AlertDialogHeader>

            <AlertDialogBody textAlign='center'>
              {t('opinion.body')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} variant='ghost' onClick={onClose}>
                {t('opinion.no')}
              </Button>
              <Link
                href='https://docs.google.com/forms/d/1r1qh-8YCrdcRz_gZQiURHjg1-cp6T7HldpemAefDPbQ/prefill'
                target='_blank'
              >
                <Button variant='teal' onClick={onClose} ml={3}>
                  {t('opinion.yes')}
                </Button>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog>
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
          'voyage',
          'planning',
        ])),
        // Will be passed to the page component as props
      },
    }
  })

export default Planning
