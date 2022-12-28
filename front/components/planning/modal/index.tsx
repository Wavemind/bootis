/**
 * The external imports
 */
import { useMemo, useState, useContext, FC, useEffect } from 'react'
import {
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
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
  const { isModalOpen, closeModal, selectedDay } = useContext(ModalContext)

  const [category, setCategory] = useState<ICategory>({} as ICategory)

  const [getPlaces, { data: places = [] }] = useLazyGetPlacesQuery()

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => {
    const stepsData = JSON.parse(localStorage.getItem('steps') as string)
    return stepsData.find((step: IStep) => step.key === 'voyageForm').formValues
  }, [])

  // Extend this to restaurants when we have them
  useEffect(() => {
    if (voyageFormData) {
      getPlaces({
        region: voyageFormData.destination.name,
        categories: voyageFormData.activities.map(
          (activity: IElement) => activity.id
        ),
      })
    }
  }, [selectedDay])

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
              <SelectBar category={category} setCategory={setCategory} />
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
                justifyContent='space-between'
              >
                {places.map(place => (
                  <ElementCard key={`place_${place.id}`} place={place} />
                ))}
              </Flex>
            </Flex>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectionModal
