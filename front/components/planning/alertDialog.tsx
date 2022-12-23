/**
 * The external imports
 */
import { FC, useContext, useRef } from 'react'
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import { AlertDialogContext } from '../../lib/contexts'

const AlertDialog: FC = () => {
  const { t } = useTranslation('planning')
  const cancelRef = useRef<HTMLButtonElement>(null)

  const { isAlertDialogOpen, closeAlertDialog, alertDialogContent } =
    useContext(AlertDialogContext)

  const handleAction = () => {
    alertDialogContent.action()
    closeAlertDialog()
  }

  return (
    <ChakraAlertDialog
      isOpen={isAlertDialogOpen}
      leastDestructiveRef={cancelRef}
      onClose={closeAlertDialog}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {alertDialogContent.title}
          </AlertDialogHeader>

          <AlertDialogBody>{alertDialogContent.content}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeAlertDialog}>
              {t('cancel')}
            </Button>
            <Button colorScheme='red' onClick={handleAction} ml={3}>
              {t('remove')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  )
}

export default AlertDialog
