/**
 * The external imports
 */
import { FC, useState } from 'react'
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
  CalendarDate,
  CalendarValues,
} from '@uselessdev/datepicker'

/**
 * Type definitions
 */
interface ICalendarProps {
  placeholder: string
  date: CalendarDate | CalendarValues
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>
}

const Calendar: FC<ICalendarProps> = ({ placeholder, date, setDate }) => {
  const [value, setValue] = useState('')

  const { onClose, isOpen, onToggle } = useDisclosure()

  /**
   * Handles the date selection event
   * @param date Date object
   */
  const handleSelectDate = (date: CalendarDate | CalendarValues) => {
    setDate(date as CalendarDate)
    setValue(format(date as CalendarDate, 'dd/MM/yyyy', { locale: fr }))
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
          value={{ start: date as CalendarDate }}
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
