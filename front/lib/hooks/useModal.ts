/**
 * The external imports
 */
import { useState } from 'react'

import { IModal, IDay } from '../types'

// Custom hook that manages the modal state and content
export default () => {
  const [isModalOpen, setIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState({} as IDay)
  const [modalType, setModalType] = useState('')

  /**
   * Sets the modal content to the incoming JSX component and opens the modal
   * @param {*} content JSX component
   */
  const openModal = ({ type = '', day = {} as IDay }: IModal) => {
    setIsOpen(true)
    setSelectedDay(day)
    setModalType(type)
  }

  /**
   * Closes the modal
   */
  const closeModal = () => {
    setIsOpen(false)
    setSelectedDay({} as IDay)
    setModalType('')
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
    selectedDay,
    setSelectedDay,
    modalType,
  }
}
