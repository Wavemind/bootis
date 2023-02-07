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
import {
  HStack,
  Flex,
  Text,
  Center,
  Spinner,
  Button,
  Box,
  VStack,
  Icon,
  Divider,
} from '@chakra-ui/react'
import { Select, chakraComponents, ControlProps } from 'chakra-react-select'
import { useTranslation } from 'next-i18next'
import { BsCaretLeftFill } from 'react-icons/bs'
import { MdOutlineLocationOn } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'

/**
 * The internal imports
 */
import ElementCard from './elementCard'
import { ModalContext } from '../../../lib/contexts'
import { useLazyGetAccommodationsQuery } from '../../../lib/services/modules/place'
import { useLazyGetAccommodationCategoriesQuery } from '../../../lib/services/modules/category'
import { formatDate } from '../../../lib/utils/date'
import { readVoyageFormData } from '../../../lib/utils/readVoyageFormData'

/**
 * Type imports
 */
import { IElement, ISlot } from '../../../lib/types'

const AccommodationContent: FC = () => {
  const { t } = useTranslation('planning')

  const { isModalOpen, closeModal, setAccommodationData } =
    useContext(ModalContext)

  const [selectedValues, setSelectedValues] = useState<IElement[]>([])
  const [loading, setLoading] = useState(true)

  const [getAccommodationCategories, { data: accommodationCategories = [] }] =
    useLazyGetAccommodationCategoriesQuery()

  const [
    getAccommodations,
    {
      data: accommodations = [],
      isSuccess: isGetAccommodationsSuccess,
      isFetching: isGetAccommodationsFetching,
    },
  ] = useLazyGetAccommodationsQuery()

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => readVoyageFormData(), [])

  // Gets accommodation data from the localStorage
  const accommodationData = useMemo(() => {
    const planningData = JSON.parse(localStorage.getItem('planning') as string)
    return planningData.accommodation
  }, [])

  /**
   * Sets the selected values from the voyage form data
   */
  useEffect(() => {
    setSelectedValues(voyageFormData.accommodation)
  }, [voyageFormData])

  /**
   * Handles the new element selection
   */
  const handleSelection = useCallback((place: ISlot) => {
    setAccommodationData(place)
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
      if (accommodations.length > 0) {
        return accommodations.map(place => (
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

  // Fetches the accommodation categories for the select
  useEffect(() => {
    getAccommodationCategories()
  }, [])

  /**
   * Callback to fetch places
   */
  const fetchPlaces = useCallback(() => {
    setLoading(true)
    getAccommodations({
      region: voyageFormData.destination.name,
    })
  }, [])

  /**
   * Fetch places when selectedValues changes
   */
  useEffect(() => {
    if (isModalOpen && !isGetAccommodationsFetching) {
      fetchPlaces()
    }
  }, [selectedValues])

  /**
   * Removes loading state if fetch is successfull
   */
  useEffect(() => {
    if (!isGetAccommodationsFetching && isGetAccommodationsSuccess) {
      setLoading(false)
    }
  }, [isGetAccommodationsFetching, isGetAccommodationsSuccess])

  /**
   * Updates the local state with the selected elements
   * @param newValue Array of selected Elements
   */
  const handleChange = (newValue: IElement[]) => {
    setSelectedValues(newValue)
  }

  return (
    <HStack display='flex' h='full' overflow='hidden'>
      <Flex
        flexDirection='column'
        h='full'
        justifyContent='space-between'
        flexBasis={316}
      >
        <Box borderRadius='lg' p={4}>
          <VStack alignItems='flex-start' spacing={4}>
            <Text fontSize='lg'>{accommodationData.name}</Text>
            <HStack>
              <Icon as={MdOutlineLocationOn} h={6} w={6} />
              <Text fontSize='sm'>{accommodationData.fullAddress}</Text>
            </HStack>
            <Divider borderColor='teal' borderWidth={1} />
            <Text fontWeight='bold'>
              {t('accommodationDates', {
                startDate: formatDate(voyageFormData.startDate, 'd'),
                endDate: formatDate(voyageFormData.endDate, 'd MMM yyyy'),
              })}
            </Text>
          </VStack>
        </Box>
        <Button
          onClick={closeModal}
          variant='primary'
          leftIcon={<BsCaretLeftFill />}
        >
          {t('back')}
        </Button>
      </Flex>
      <Flex direction='column' h='full' gap={2} flex={1}>
        <Select
          components={{
            Control: (props: ControlProps<IElement>) => (
              <chakraComponents.Control {...props}>
                <HStack w='full' ml={3}>
                  <Icon as={BsSearch} h={5} w={5} />
                  {props.children}
                </HStack>
              </chakraComponents.Control>
            ),
          }}
          value={selectedValues}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(newValue: any) => handleChange(newValue)}
          useBasicStyles
          options={accommodationCategories as IElement[]}
          getOptionValue={(option: IElement) => String(option.id)}
          placeholder={t('select', { ns: 'common' })}
          noOptionsMessage={() => <Text>{t('selectCategory')}</Text>}
          chakraStyles={{
            option: (provided, { isSelected }) => ({
              ...provided,
              ...(isSelected && {
                backgroundColor: 'blueLight',
              }),
            }),
            control: provided => ({
              ...provided,
              height: 'full',
              borderRadius: 'full',
              bg: 'white',
              py: 1,
            }),
            multiValue: provided => ({
              ...provided,
              backgroundColor: 'black',
              borderRadius: 'full',
              px: 4,
              py: 1,
            }),
            multiValueLabel: provided => ({
              ...provided,
              color: 'white',
            }),
            multiValueRemove: provided => ({
              ...provided,
              color: 'white',
            }),
          }}
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

export default AccommodationContent
