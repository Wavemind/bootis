/**
 * The external imports
 */
import { useMemo, useState, useContext, FC, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Box,
  HStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Flex,
  VStack,
  Text,
} from '@chakra-ui/react'
import { Select, chakraComponents, ControlProps } from 'chakra-react-select'
import { BsSearch } from 'react-icons/bs'
import { BsCaretLeftFill } from 'react-icons/bs'
import { GrAddCircle } from 'react-icons/gr'

/**
 * The internal imports
 */
import { ModalContext } from '../../lib/contexts'
import CategorySelection from './categorySelection'
import restaurantTypes from '../../lib/config/restaurantTypes'
import SelectionElement from './selectionElement'
import {
  useGetActivityCategoriesQuery,
  useGetAccommodationCategoriesQuery,
  useLazyGetCategoriesByRegionQuery,
} from '../../lib/services/modules/category'

/**
 * Type imports
 */
import { ICategory, IEnumOption, IStep } from '../../lib/types'
import SlotCard from './slot'

/**
 * Type definitions
 */
interface IElement extends IEnumOption {
  label: string
}

const SelectionModal: FC = () => {
  const { t } = useTranslation('planning')

  const { isModalOpen, closeModal, selectedDay } = useContext(ModalContext)

  const [category, setCategory] = useState<ICategory>({} as ICategory)

  const { data: activityCategories = [] } = useGetActivityCategoriesQuery()
  const { data: accommodationCategories = [] } =
    useGetAccommodationCategoriesQuery()

  const [getCategoriesByRegion, { data: categoriesByRegion = [] }] =
    useLazyGetCategoriesByRegionQuery()

  useEffect(() => {
    const voyageFormData = JSON.parse(
      localStorage.getItem('steps') as string
    ).find((step: IStep) => step.key === 'voyageForm')
    getCategoriesByRegion(voyageFormData.formValues.destination.name)
  }, [])

  /**
   * Fill the select with preselected values from the voyage step
   */
  const preselectedValues = useMemo(() => {
    if (!category.key) {
      return []
    }

    const voyageStep = JSON.parse(localStorage.getItem('steps') as string).find(
      (step: IStep) => step.key === 'voyageForm'
    )

    if (category.key === 'accommodation') {
      return voyageStep.formValues.accommodation
    } else if (category.key === 'restaurant') {
      return restaurantTypes
    } else {
      return voyageStep.formValues.activities
    }
  }, [category])

  /**
   * Provide the correct elements to the select based on user category selection
   */
  const selectElements = useMemo(() => {
    if (!category.key) {
      return []
    }

    if (category.key === 'accommodation') {
      return accommodationCategories
    } else if (category.key === 'restaurant') {
      return restaurantTypes
    } else {
      return activityCategories.map(activity => ({
        ...activity,
        isDisabled: !categoriesByRegion.includes(activity.id),
      }))
    }
  }, [category])

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
        <ModalBody maxW='1600px' mx='auto' my={10} overflow='hidden'>
          <HStack h='full' overflow='hidden'>
            <VStack justifyContent='space-between' h='full'>
              <VStack
                px={4}
                direction='column'
                gap={3}
                h='full'
                overflowY='scroll'
                overflowX='hidden'
                css={{
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <Text fontSize='xl' fontFamily='Noir Pro Medium, sans-serif'>
                  {selectedDay.date}
                </Text>
                {selectedDay?.schedule?.map(slot => (
                  <SlotCard key={slot.label} slot={slot} isReduced />
                ))}
                <Box
                  as={Button}
                  w='full'
                  border='1px solid black'
                  borderRadius='lg'
                  bg='white'
                  py={7}
                >
                  <Icon as={GrAddCircle} w={10} h={10} />
                </Box>
              </VStack>
              <Button
                onClick={closeModal}
                variant='primary'
                leftIcon={<BsCaretLeftFill />}
              >
                {t('back')}
              </Button>
            </VStack>
            <Flex direction='column' h='full' gap={2} flex={1}>
              <HStack
                bg='blue'
                py={2}
                px={4}
                borderRadius='xl'
                spacing={6}
                mx={2}
              >
                <Box w='full'>
                  <Select
                    closeMenuOnSelect={!category.isMulti}
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
                    value={preselectedValues}
                    isMulti={category.isMulti}
                    useBasicStyles
                    options={selectElements as IElement[]}
                    getOptionValue={(option: IElement) => String(option.id)}
                    noOptionsMessage={() => t('selectCategory')}
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
                </Box>
                <CategorySelection
                  category={category}
                  setCategory={setCategory}
                />
              </HStack>
              <Flex
                flexWrap='wrap'
                gap={2}
                px={2}
                overflowY='scroll'
                h='full'
                css={{
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
                <SelectionElement />
              </Flex>
            </Flex>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectionModal
