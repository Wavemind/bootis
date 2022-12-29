/**
 * The external imports
 */
import {
  FC,
  useMemo,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react'
import { useTranslation } from 'next-i18next'
import {
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Center,
  Spinner,
} from '@chakra-ui/react'

/**
 * The internal imports
 */
import { ModalContext } from '../../../lib/contexts'
import { useLazyGetPlacesQuery } from '../../../lib/services/modules/place'
import ElementCard from './elementCard'
import SelectBar from './selectBar'
import SelectedDay from './selectedDay'

/**
 * Type imports
 */
import { ICategory, IElement, IStep } from '../../../lib/types'

const SelectionModal: FC = () => {
  const { t } = useTranslation('planning')

  const { isModalOpen, closeModal, selectedDay } = useContext(ModalContext)

  const [categoryType, setCategoryType] = useState<ICategory>({} as ICategory)
  const [selectedValues, setSelectedValues] = useState<IElement[]>([])
  const [loading, setLoading] = useState(true)

  const [getPlaces, { data: places = [], isSuccess, isFetching }] =
    useLazyGetPlacesQuery()

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => {
    const stepsData = JSON.parse(localStorage.getItem('steps') as string)
    return stepsData.find((step: IStep) => step.key === 'voyageForm').formValues
  }, [])

  /**
   * Renders the correct visual for the list content
   * @returns TSX
   */
  const renderList = () => {
    if (loading) {
      return (
        <Center h='full' w='full'>
          <Spinner size='xl' color='salmon' thickness='4px' />
        </Center>
      )
    } else {
      if (places.length > 0) {
        return places.map(place => (
          <ElementCard key={`place_${place.id}`} place={place} />
        ))
      } else {
        return (
          <HStack
            pt={10}
            w='full'
            justifyContent='center'
            alignItems='flex-start'
          >
            <Text fontStyle='italic'>{t('selectCategory')}</Text>
          </HStack>
        )
      }
    }
  }

  /**
   * Callback to fetch places
   */
  const fetchPlaces = useCallback((type: string, categories: IElement[]) => {
    setLoading(true)
    if (type === 'activity') {
      getPlaces({
        region: voyageFormData.destination.name,
        categories: categories.map(activity => activity.id),
      })
    } else {
      getPlaces({
        region: voyageFormData.destination.name,
        categories: [4],
      })
    }
  }, [])

  /**
   * Fetch places when selectedDay changes
   */
  useEffect(() => {
    if (voyageFormData) {
      const selectedSlot = selectedDay.activities?.find(
        activity => activity.selected
      )
      if (selectedSlot) {
        if (isModalOpen && !isFetching) {
          fetchPlaces(selectedSlot?.type, voyageFormData.activities)
        }
      } else {
        setLoading(false)
      }
    }
  }, [selectedDay])

  /**
   * Fetch places when categoryType changes
   */
  useEffect(() => {
    if (isModalOpen && !isFetching) {
      fetchPlaces(categoryType.key, voyageFormData.activities)
    }
  }, [categoryType])

  /**
   * Fetch places when selectedValues changes
   */
  useEffect(() => {
    if (isModalOpen && !isFetching) {
      fetchPlaces(categoryType.key, selectedValues)
    }
  }, [selectedValues])

  /**
   * Removes loading state if fetch is successfull
   */
  useEffect(() => {
    if (!isFetching && isSuccess) {
      setLoading(false)
    }
  }, [isFetching, isSuccess])

  return (
    <Modal
      onClose={closeModal}
      size='full'
      isOpen={isModalOpen}
      motionPreset='slideInRight'
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent maxH='calc(100vh)' h='calc(100vh)'>
        <ModalBody maxW='1600px' mx='auto' my={10} overflow='hidden' w='full'>
          <HStack display='flex' h='full' overflow='hidden'>
            <SelectedDay />
            <Flex direction='column' h='full' gap={2} flex={1}>
              <SelectBar
                categoryType={categoryType}
                setCategoryType={setCategoryType}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
              />
              <Flex
                flexWrap='wrap'
                gap='1%'
                px={2}
                overflowY='scroll'
                h='full'
                css={{
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {renderList()}
              </Flex>
            </Flex>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectionModal
