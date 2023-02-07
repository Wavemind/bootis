/**
 * The external imports
 */
import { FC } from 'react'
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
 * The internal imports
 */
import { formatDate } from '../../lib/utils/date'

/**
 * Type definitions
 */
interface ICalendarProps {
  date: CalendarDate | CalendarValues
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>
  disabledBefore?: Date
}

const Calendar: FC<ICalendarProps> = ({
  date,
  setDate,
  disabledBefore = new Date(),
}) => {
  const { onClose, isOpen, onToggle } = useDisclosure()

  /**
   * Handles the date selection event
   * @param newDate Date object
   */
  const handleSelectDate = (newDate: CalendarDate | CalendarValues) => {
    setDate(newDate as CalendarDate)
    onClose()
  }

  return (
    <Popover placement='bottom' isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box onClick={onToggle} role='button' tabIndex={0} cursor='pointer'>
          {formatDate(date as Date, 'dd.MM.yyyy')}
        </Box>
      </PopoverTrigger>

      <PopoverContent w='full' border='none'>
        <ChakraCalendar
          locale={fr}
          value={{ start: date as CalendarDate }}
          onSelectDate={handleSelectDate}
          singleDateSelection
          allowOutsideDays
          disablePastDates={disabledBefore}
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
