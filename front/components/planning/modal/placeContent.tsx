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
import { HStack, Flex, Text, Center, Spinner } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import isEmpty from 'lodash/isEmpty'

/**
 * The internal imports
 */
import { ModalContext } from '../../../lib/contexts'
import {
  useLazyGetPlacesQuery,
  useLazyGetRestaurantsQuery,
} from '../../../lib/services/modules/place'
import ElementCard from './elementCard'
import SelectBar from './selectBar'
import SelectedDay from './selectedDay'
import { readVoyageFormData } from '../../../lib/utils/readVoyageFormData'

/**
 * Type imports
 */
import { ICategory, IElement, ISlot } from '../../../lib/types'

const PlaceContent: FC = () => {
  const { t } = useTranslation('planning')

  const { isModalOpen, selectedDay, closeModal, setPlanningData } =
    useContext(ModalContext)

  const [categoryType, setCategoryType] = useState<ICategory>({} as ICategory)
  const [selectedValues, setSelectedValues] = useState<IElement[]>([])
  const [loading, setLoading] = useState(true)

  const [
    getPlaces,
    {
      data: places = [],
      isSuccess: isPlacesSuccess,
      isFetching: isPlacesFetching,
    },
  ] = useLazyGetPlacesQuery()

  const [
    getRestaurants,
    {
      data: restaurants = [],
      isSuccess: isRestaurantsSuccess,
      isFetching: isRestaurantsFetching,
    },
  ] = useLazyGetRestaurantsQuery()

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => readVoyageFormData(), [])

  /**
   * Handles the new element selection
   */
  const handleSelection = useCallback((place: ISlot) => {
    const selectedSlot = selectedDay.activities.findIndex(
      activity => activity.selected
    )
    if (selectedSlot > -1) {
      selectedDay.activities[selectedSlot] = place
    } else {
      selectedDay.activities.push(place)
    }
    setPlanningData(prev => {
      const dayIndex = prev.findIndex(day => day.date === selectedDay.date)
      prev[dayIndex] = selectedDay
      return prev
    })
    closeModal()
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
      if (!isEmpty(categoryType) && places.length > 0) {
        const elements =
          categoryType.key === 'restaurant' ? restaurants : places
        return elements.map(place => (
          <ElementCard
            key={`place_${place.id}`}
            place={place}
            handleSelection={handleSelection}
          />
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
      getRestaurants({
        region: voyageFormData.destination.name,
        cuisines: categories.map(activity => activity.id),
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
        if (isModalOpen && !isPlacesFetching && !isRestaurantsFetching) {
          const categories =
            selectedSlot.type === 'activity' ? 'activities' : 'cuisines'
          fetchPlaces(selectedSlot?.type, voyageFormData[categories])
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
    if (isModalOpen && !isPlacesFetching && !isRestaurantsFetching) {
      const categories =
        categoryType.key === 'activity' ? 'activities' : 'cuisines'
      fetchPlaces(categoryType.key, voyageFormData[categories])
    }
  }, [categoryType])

  /**
   * Fetch places when selectedValues changes
   */
  useEffect(() => {
    if (isModalOpen && !isPlacesFetching && !isRestaurantsFetching) {
      fetchPlaces(categoryType.key, selectedValues)
    }
  }, [selectedValues])

  /**
   * Removes loading state if fetch is successfull
   */
  useEffect(() => {
    if (
      (!isPlacesFetching && isPlacesSuccess) ||
      (!isRestaurantsFetching && isRestaurantsSuccess)
    ) {
      setLoading(false)
    }
  }, [
    isPlacesFetching,
    isPlacesSuccess,
    isRestaurantsFetching,
    isRestaurantsSuccess,
  ])

  return (
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
  )
}

export default PlaceContent
