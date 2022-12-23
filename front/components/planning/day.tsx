/**
 * The external imports
 */
import { FC, useContext } from 'react'
import {
  Box,
  VStack,
  Icon,
  Text,
  Button,
  Center,
  HStack,
} from '@chakra-ui/react'
import { GrAddCircle } from 'react-icons/gr'
import { BsPinMap } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import { AlertDialogContext, ModalContext } from '../../lib/contexts'

/**
 * Type imports
 */
import { IDay } from '../../lib/types'

/**
 * Type definitions
 */
interface IDayProps {
  day: IDay
  dayIndex: number
  setPlanningData: React.Dispatch<React.SetStateAction<IDay[]>>
}

const PlanningDay: FC<IDayProps> = ({ day, dayIndex, setPlanningData }) => {
  const { t } = useTranslation('planning')

  const { openModal } = useContext(ModalContext)

  const { openAlertDialog } = useContext(AlertDialogContext)

  /**
   * Opens the modal to select replacement activity
   */
  const handleReplace = (index: number) => {
    // LOL
    const newDay = JSON.parse(JSON.stringify(day))
    newDay.schedule[index] = {
      ...newDay.schedule[index],
      selected: true,
    }
    openModal({ day: newDay })
  }

  /**
   * Opens the modal to select additional activity
   */
  const handleAdd = () => {
    openModal({ day })
  }

  /**
   * Removes the selected activity
   */
  const handleRemoveSlot = (slotIndex: number) => {
    openAlertDialog({
      title: t('removeDialogTitle'),
      content: t('removeDialogContent'),
      action: () => {
        const newDay = JSON.parse(JSON.stringify(day))
        newDay.schedule.splice(slotIndex, 1)
        setPlanningData(prev => {
          const newPlanningData = prev
          newPlanningData[dayIndex] = newDay
          return newPlanningData
        })
      },
    })
  }

  return (
    <VStack spacing={3}>
      <Text fontSize='xl' fontFamily='Noir Pro Medium, sans-serif'>
        {day.date}
      </Text>
      {day.schedule.map((slot, index) => (
        <Box key={slot.id} w={316} borderRadius='lg' bg='white' boxShadow='lg'>
          <Center
            h={75}
            bg='grey'
            borderRadius='lg'
            color='black'
            position='relative'
          >
            <Box
              position='absolute'
              top={0}
              left={0}
              bg={slot.type === 'activity' ? 'teal' : 'salmon'}
              py={1}
              px={2}
              color='white'
              borderTopLeftRadius='lg'
              borderBottomRightRadius='lg'
              fontSize='xs'
            >
              {t(slot.type)}
            </Box>
            Image
          </Center>
          <Box p={2}>
            <Text color='black' fontWeight='bold' my={2}>
              {slot.label}
            </Text>
            <HStack>
              <Icon as={BsPinMap} color='black' h={4} w={4} />
              <Text color='black' fontSize='xs' noOfLines={1}>
                {slot.address}
              </Text>
            </HStack>
            <HStack my={2} spacing={2}>
              {slot.signs.map((sign: string) => (
                <Box key={sign} bg='blue' h={22} w={22} borderRadius='sm' />
              ))}
            </HStack>
            <HStack justifyContent='space-between' spacing={6} mt={3}>
              <Button
                size='sm'
                color={slot.type === 'activity' ? 'teal' : 'salmon'}
                variant='outline'
                borderColor={slot.type === 'activity' ? 'teal' : 'salmon'}
                onClick={() => handleReplace(index)}
              >
                {t('replace')}
              </Button>
              <Button
                size='sm'
                variant='ghost'
                onClick={() => handleRemoveSlot(index)}
              >
                {t('remove')}
              </Button>
            </HStack>
          </Box>
        </Box>
      ))}
      <Box
        as={Button}
        w='full'
        border='1px solid black'
        borderRadius='lg'
        bg='white'
        py={7}
        onClick={handleAdd}
      >
        <Icon as={GrAddCircle} w={10} h={10} />
      </Box>
    </VStack>
  )
}

export default PlanningDay
