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
} from '@chakra-ui/react'
import { Select as ChakraSelect } from 'chakra-react-select'
import { GrCircleInformation } from 'react-icons/gr'

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

  // TODO : Do this once we implement modals
  const openInfoModal = () => {
    console.log(infoContent)
  }

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
                  <GrCircleInformation
                    onClick={openInfoModal}
                    cursor='pointer'
                    size={22}
                  />
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
