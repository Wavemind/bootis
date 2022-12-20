/**
 * The external imports
 */
import { useMemo, useState, useContext, FC, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Box,
  HStack,
  SimpleGrid,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
  VStack,
  Text,
} from '@chakra-ui/react'
import { Select, chakraComponents, ControlProps } from 'chakra-react-select'
import { BsSearch } from 'react-icons/bs'
import { GrAddCircle } from 'react-icons/gr'

/**
 * The internal imports
 */
import { ModalContext } from '../../lib/contexts'
import CategorySelection from './categorySelection'
import ReducedPlanningCard from './reducedCard'
import accommodationTypes from '../../lib/config/accommodationTypes'
import restaurantTypes from '../../lib/config/restaurantTypes'
import activities from '../../lib/config/activities'
import SelectionElement from './selectionElement'

/**
 * Type definitions
 */
import { CategoryType, ElementType } from '../../lib/types'

const SelectionModal: FC = () => {
  const { t } = useTranslation('planning')

  const { isModalOpen, closeModal, selectedDay } = useContext(ModalContext)

  const [category, setCategory] = useState<CategoryType>({} as CategoryType)

  useEffect(() => {
    if (Object.keys(selectedDay).length > 0) {
      const newSlot = selectedDay.schedule.find(slot => slot.selected)
      if (newSlot) {
        const newCategory = categories.find(
          category => category.key === newSlot.type
        )
        if (newCategory) {
          setCategory(newCategory)
        }
      }
    } else {
      setCategory({} as CategoryType)
    }
  }, [selectedDay])

  const categories = useMemo(
    () => [
      {
        key: 'accommodation',
        label: t('categories.accommodations'),
        variant: 'teal',
        isMulti: false,
      },
      {
        key: 'restaurant',
        label: t('categories.restaurants'),
        variant: 'salmon',
        isMulti: true,
      },
      {
        key: 'activity',
        label: t('categories.activities'),
        variant: 'turquoise',
        isMulti: true,
      },
    ],
    []
  )

  /**
   * Provide the correct elements to the select based on user category selection
   */
  const selectElements = useMemo(() => {
    if (!category.key) {
      return []
    }

    if (category.key === 'accommodationTypes') {
      return accommodationTypes
    } else if (category.key === 'restaurantTypes') {
      return restaurantTypes
    } else {
      return activities
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
        <ModalBody w='1600px' maxW='1600px' mx='auto' my={10} overflow='hidden'>
          <HStack h='full' overflow='hidden'>
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
                <ReducedPlanningCard key={slot.label} slot={slot} />
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
            <Flex direction='column' w='full' h='full' gap={2} flex={3}>
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
                      Control: (props: ControlProps<ElementType>) => (
                        <chakraComponents.Control {...props}>
                          <HStack w='full' ml={3}>
                            <Icon as={BsSearch} h={5} w={5} />
                            {props.children}
                          </HStack>
                        </chakraComponents.Control>
                      ),
                    }}
                    isMulti={category.isMulti}
                    useBasicStyles
                    options={selectElements}
                    getOptionValue={(option: ElementType) => String(option.id)}
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
                  categories={categories}
                  category={category}
                  setCategory={setCategory}
                />
              </HStack>
              <SimpleGrid
                columns={4}
                spacing={2}
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
              </SimpleGrid>
            </Flex>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeModal} variant='primary'>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SelectionModal