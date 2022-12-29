/**
 * The external imports
 */
import { FC, useContext } from 'react'
import { Box, VStack, Icon, Text, Button } from '@chakra-ui/react'
import { GrAddCircle } from 'react-icons/gr'
import { useTranslation } from 'next-i18next'
import format from 'date-fns/format'

/**
 * The internal imports
 */
import { AlertDialogContext, ModalContext } from '../../lib/contexts'
import { SlotCard } from '../'

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
    // To "copy" day
    const selectedDay = JSON.parse(JSON.stringify(day))
    selectedDay.activities[index].selected = true
    openModal({ day: selectedDay })
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
        newDay.activities.splice(slotIndex, 1)
        setPlanningData(prev => {
          const newPlanningData = prev
          newPlanningData[dayIndex] = newDay
          return newPlanningData
        })
      },
    })
  }

  return (
    <VStack spacing={3} flexBasis={316}>
      <Text fontSize='xl' fontFamily='Noir Pro Medium, sans-serif'>
        {format(new Date(day.date), 'dd.MM.yyyy')}
      </Text>
      {day.activities.map((slot, index) => (
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
