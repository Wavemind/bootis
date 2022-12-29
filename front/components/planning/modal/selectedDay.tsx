/**
 * The external imports
 */
import { useContext, FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, VStack, Text } from '@chakra-ui/react'
import { BsCaretLeftFill } from 'react-icons/bs'
import format from 'date-fns/format'

/**
 * The internal imports
 */
import { SlotCard } from '../../'
import { ModalContext } from '../../../lib/contexts'

const SelectedDay: FC = () => {
  const { t } = useTranslation('planning')

  const { closeModal, selectedDay } = useContext(ModalContext)

  return (
    <VStack flexBasis={316} justifyContent='space-between' h='full'>
      <VStack
        px={4}
        direction='column'
        gap={3}
        w='full'
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
          {selectedDay.date && format(new Date(selectedDay.date), 'dd.MM.yyyy')}
        </Text>
        {selectedDay.activities?.map(slot => (
          <SlotCard key={slot.name} slot={slot} isReduced />
        ))}
      </VStack>
      <Button
        onClick={closeModal}
        variant='primary'
        leftIcon={<BsCaretLeftFill />}
      >
        {t('back')}
      </Button>
    </VStack>
  )
}

export default SelectedDay
