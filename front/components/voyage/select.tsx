/**
 * The external imports
 */
import { Controller, useFormContext } from 'react-hook-form'
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Icon,
} from '@chakra-ui/react'
import { Select as ChakraSelect } from 'chakra-react-select'
import { BsInfoCircle } from 'react-icons/bs'

/**
 * Type definitions
 */
interface SelectPropTypes {
  name: string
  label: string
  subLabel: string
  options: { id: number; label: string; activities?: number[] }[]
  isMulti?: boolean
  hasInfo?: boolean
  infoContent?: React.ReactNode
}

const Select = (props: SelectPropTypes) => {
  const {
    name,
    label,
    subLabel,
    options,
    isMulti = false,
    hasInfo = false,
    infoContent = null,
  } = props

  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <FormControl isInvalid={!!error} id={name}>
          <FormLabel pb={2}>
            <Box>
              <HStack justifyContent='space-between'>
                <Heading variant='h2'>{label}</Heading>
                {hasInfo && (
                  <Popover isLazy placement='top' size='sm'>
                    <PopoverTrigger>
                      <Icon as={BsInfoCircle} cursor='pointer' w={22} h={22} />
                    </PopoverTrigger>
                    <PopoverContent border='none' minW='30em'>
                      <PopoverArrow bg='blue' />
                      <PopoverBody bg='blue' borderRadius='lg' p={8}>
                        {infoContent}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                )}
              </HStack>
              <Text fontSize='sm' w='35em'>
                {subLabel}
              </Text>
            </Box>
          </FormLabel>

          <ChakraSelect
            isMulti={isMulti}
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            options={options}
            getOptionValue={option => String(option.id)}
            useBasicStyles
            focusBorderColor='salmon'
            chakraStyles={{
              option: (provided, { isSelected }) => ({
                ...provided,
                ...(isSelected && {
                  backgroundColor: 'blueLight',
                }),
              }),
              multiValue: provided => ({
                ...provided,
                backgroundColor: 'black',
                borderRadius: 'full',
                px: 4,
                py: 1,
              }),
              multiValueLabel: provided => ({
                ...provided,
                color: 'white',
              }),
              multiValueRemove: provided => ({
                ...provided,
                color: 'white',
              }),
            }}
            closeMenuOnSelect={!isMulti}
          />

          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  )
}

export default Select
