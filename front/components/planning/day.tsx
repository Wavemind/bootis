/**
 * The external imports
 */
import { FC, useContext } from 'react'
import { Box, VStack, Icon, Text, Button } from '@chakra-ui/react'
import { GrAddCircle } from 'react-icons/gr'
import { useTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import { AlertDialogContext, ModalContext } from '../../lib/contexts'

/**
 * Type imports
 */
import { IDay } from '../../lib/types'
import SlotCard from './slot'

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
    newDay.schedule[index].selected = true
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
        <SlotCard
          key={`slot_${index}`}
          slot={slot}
          index={index}
          handleRemove={handleRemoveSlot}
          handleReplace={handleReplace}
        />
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