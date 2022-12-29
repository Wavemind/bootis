/**
 * The external imports
 */
import { useContext, FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Icon, Button, VStack, Text } from '@chakra-ui/react'
import { BsCaretLeftFill } from 'react-icons/bs'
import { GrAddCircle } from 'react-icons/gr'
import format from 'date-fns/format'

/**
 * The internal imports
 */
import SlotCard from '../slot'
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
        <Box
          as={Button}
          w='full'
          border='1px solid black'
          borderRadius='lg'
          bg='white'
          py={7}
        >
          <Icon as={GrAddCircle} w={10} h={10} />
        </Box>
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
