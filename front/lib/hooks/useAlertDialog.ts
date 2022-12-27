/**
 * The external imports
 */
import { useState } from 'react'

/**
 * Type imports
 */
import { IAlertDialog } from '../types'

// Custom hook that manages the alertDialog state and content
export default () => {
  const [isAlertDialogOpen, setIsOpen] = useState(false)
  const [alertDialogContent, setAlertDialogContent] = useState(
    {} as IAlertDialog
  )

  /**
   * Sets the modal content to the incoming JSX component and opens the modal
   * @param {*} content JSX component
   */
  const openAlertDialog = ({ title, content, action }: IAlertDialog) => {
    setIsOpen(true)
    setAlertDialogContent({ title, content, action })
  }

  /**
   * Closes the modal
   */
  const closeAlertDialog = () => {
    setIsOpen(false)
  }

  return {
    isAlertDialogOpen,
    openAlertDialog,
    closeAlertDialog,
    alertDialogContent,
  }
}
