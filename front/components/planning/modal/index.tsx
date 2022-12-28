/**
 * The external imports
 */
import { useMemo, useState, useContext, FC, useEffect } from 'react'
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
  const [loading, setLoading] = useState(false)

  const [getPlaces, { data: places = [] }] = useLazyGetPlacesQuery()

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => {
    const stepsData = JSON.parse(localStorage.getItem('steps') as string)
    return stepsData.find((step: IStep) => step.key === 'voyageForm').formValues
  }, [])

  useEffect(() => {
    if (voyageFormData) {
      const selectedSlot = selectedDay.activities?.find(
        activity => activity.selected
      )
      if (selectedSlot) {
        if (selectedSlot?.type === 'activity') {
          getPlaces({
            region: voyageFormData.destination.name,
            categories: voyageFormData.activities.map(
              (activity: IElement) => activity.id
            ),
          })
        } else {
          // TODO : Get the category from the backend I'm guessing ?
          getPlaces({
            region: voyageFormData.destination.name,
            categories: [4],
          })
        }
      }
    }
  }, [selectedDay])

  useEffect(() => {
    if (categoryType) {
      if (categoryType.key === 'activity') {
        getPlaces({
          region: voyageFormData.destination.name,
          categories: voyageFormData.activities.map(
            (activity: IElement) => activity.id
          ),
        })
      } else {
        getPlaces({
          region: voyageFormData.destination.name,
          categories: [4],
        })
      }
    }
  }, [categoryType])

  useEffect(() => {
    if (categoryType) {
      if (categoryType.key === 'activity') {
        getPlaces({
          region: voyageFormData.destination.name,
          categories: selectedValues.map((activity: IElement) => activity.id),
        })
      } else {
        getPlaces({
          region: voyageFormData.destination.name,
          categories: [4],
        })
      }
    }
  }, [selectedValues])

  if (loading) {
    return (
      <Center h='full'>
        <Spinner size='xl' color='salmon' thickness='4px' />
      </Center>
    )
  }

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
                {places.length > 0 ? (
                  places.map(place => (
                    <ElementCard key={`place_${place.id}`} place={place} />
                  ))
                ) : (
                  <HStack
                    pt={10}
                    w='full'
                    justifyContent='center'
                    alignItems='flex-start'
                  >
                    <Text fontStyle='italic'>{t('selectCategory')}</Text>
                  </HStack>
                )}
              </Flex>
            </Flex>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectionModal
