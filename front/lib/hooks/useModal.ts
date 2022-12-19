/**
 * The external imports
 */
import { useState } from 'react'

type ModalType = {
  category: string
}

// Custom hook that manages the modal state and content
export default () => {
  const [isModalOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState('')

  /**
   * Sets the modal content to the incoming JSX component and opens the modal
   * @param {*} content JSX component
   */
  const openModal = () => {
    setIsOpen(true)
  }

  /**
   * Closes the modal
   */
  const closeModal = () => {
    setIsOpen(false)
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
    category,
  }
}
