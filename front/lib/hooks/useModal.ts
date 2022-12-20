/**
 * The external imports
 */
import { useState } from 'react'

import { ModalType, DayType } from '../types'

// Custom hook that manages the modal state and content
export default () => {
  const [isModalOpen, setIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState({} as DayType)

  /**
   * Sets the modal content to the incoming JSX component and opens the modal
   * @param {*} content JSX component
   */
  const openModal = ({ day = {} as DayType }: ModalType) => {
    setIsOpen(true)
    setSelectedDay(day)
  }

  /**
   * Closes the modal
   */
  const closeModal = () => {
    setIsOpen(false)
    setSelectedDay({} as DayType)
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
    selectedDay,
  }
}
