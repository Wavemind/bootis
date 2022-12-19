/**
 * The external imports
 */
import { useState } from 'react'

import { ModalType } from '../types'

// Custom hook that manages the modal state and content
export default () => {
  const [isModalOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  /**
   * Sets the modal content to the incoming JSX component and opens the modal
   * @param {*} content JSX component
   */
  const openModal = ({ category = '' }: ModalType) => {
    setIsOpen(true)
    setSelectedCategory(category)
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
    selectedCategory,
  }
}
