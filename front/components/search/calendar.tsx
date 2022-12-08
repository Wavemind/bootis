/**
 * The external imports
 */
import React, { useState } from 'react'
import format from 'date-fns/format'
import fr from 'date-fns/locale/fr'
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from '@chakra-ui/react'
import {
  Calendar as ChakraCalendar,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
} from '@uselessdev/datepicker'

/**
 * Type definitions
 */
interface CalendarProps {
  placeholder: string
  date: Date
  setDate: React.Dispatch<React.SetStateAction<string>>
}

const Calendar = (props: CalendarProps) => {
  const { placeholder, date, setDate } = props

  const [value, setValue] = useState('')

  const { onClose, isOpen, onToggle } = useDisclosure()

  /**
   * Handles the date selection event
   * @param date Date object
   */
  const handleSelectDate = selectedDate => {
    setDate(selectedDate)
    setValue(format(selectedDate, 'dd/MM/yyyy', { locale: fr }))
    onClose()
  }

  return (
    <Popover placement='bottom' isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box onClick={onToggle} role='button' tabIndex={0} cursor='pointer'>
          {value.length > 0 ? value : placeholder}
        </Box>
      </PopoverTrigger>

      <PopoverContent w='full' border='none'>
        <ChakraCalendar
          locale={fr}
          value={{ start: date }}
          onSelectDate={handleSelectDate}
          singleDateSelection
          allowOutsideDays
          disablePastDates
        >
          <PopoverBody p={0}>
            <CalendarControls>
              <CalendarPrevButton />
              <CalendarNextButton />
            </CalendarControls>

            <CalendarMonths>
              <CalendarMonth>
                <CalendarMonthName />
                <CalendarWeek />
                <CalendarDays />
              </CalendarMonth>
            </CalendarMonths>
          </PopoverBody>
        </ChakraCalendar>
      </PopoverContent>
    </Popover>
  )
}

export default Calendar
