/**
 * The external imports
 */
import { FC, useContext, useMemo } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'

/**
 * The internal imports
 */
import { ModalContext } from '../../../lib/contexts'
import PlaceContent from './placeContent'
import AccommodationContent from './accommodationContent'

/**
 * Type imports
 */

const SelectionModal: FC = () => {
  const { isModalOpen, closeModal, modalType } = useContext(ModalContext)

  /**
   * Renders the correct visual for the modal content
   * @returns TSX
   */
  const modalContent = useMemo(() => {
    if (modalType === 'place') {
      return <PlaceContent />
    } else {
      return <AccommodationContent />
    }
  }, [modalType])

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
          {modalContent}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectionModal
