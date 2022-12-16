/**
 * The external imports
 */
import React, { FC, useEffect } from 'react'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'
import addDays from 'date-fns/addDays'
import fr from 'date-fns/locale/fr'
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Input,
  Heading,
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
import { Controller, useFormContext } from 'react-hook-form'

/**
 * Type definitions
 */
import { DatePickerProps } from '../../lib/types'

const DatePicker: FC<DatePickerProps> = ({ name, label }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { control, watch, getValues, setValue } = useFormContext()

  useEffect(() => {
    if (name === 'endDate') {
      const startDateValue = getValues('startDate')
      if (getValues('endDate') <= startDateValue) {
        setValue('endDate', addDays(startDateValue, 1))
      }
    }
  }, [watch('startDate')])

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <React.Fragment>
          <Heading variant='h2'>{label}</Heading>
          <Popover placement='bottom' isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <Box onClick={onOpen} w='full'>
                <Input
                  placeholder='dd/MM/yyyy'
                  cursor='pointer'
                  _hover={{ borderColor: 'salmon' }}
                  isReadOnly
                  value={
                    isValid(value)
                      ? format(value, 'dd/MM/yyyy')
                      : format(new Date(), 'dd/MM/yyyy')
                  }
                  onChange={date => {
                    onChange(date)
                    onClose()
                  }}
                  onBlur={onBlur}
                  borderColor={error && 'red'}
                />
              </Box>
            </PopoverTrigger>

            <PopoverContent p={0} w='full' border='none'>
              <ChakraCalendar
                locale={fr}
                value={{ start: value }}
                onSelectDate={date => {
                  onChange(date)
                  onClose()
                }}
                singleDateSelection
                allowOutsideDays
                disablePastDates={addDays(getValues('startDate'), 1)}
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
        </React.Fragment>
      )}
    />
  )
}

export default DatePicker
