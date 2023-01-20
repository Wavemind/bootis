/**
 * The external imports
 */
import { FC } from 'react'
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  useDisclosure,
  HStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import isEmpty from 'lodash/isEmpty'

/**
 * Type imports
 */
import { IEnumOption } from '../../lib/types'

/**
 * Type definitions
 */

interface IOption extends IEnumOption {
  label?: string
  unavailable?: boolean
}

interface ISelectProps {
  options: IOption[] | never[]
  placeholder: string | React.ReactNode
  selected: IOption
  setSelected: React.Dispatch<React.SetStateAction<IOption>>
  labelKey?: string
  emptyMessage: string
}

const Select: FC<ISelectProps> = ({
  options,
  placeholder,
  selected,
  setSelected,
  labelKey = 'label',
  emptyMessage,
}) => {
  const { t } = useTranslation('search')
  const { onClose, isOpen, onToggle } = useDisclosure()

  /**
   * Handles the element selection event
   * @param element string
   */
  const handleSelect = (selectedElement: IEnumOption) => {
    setSelected(selectedElement)
    onClose()
  }

  return (
    <Popover placement='bottom' isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box onClick={onToggle} role='button' tabIndex={0} cursor='pointer'>
          {!isEmpty(selected) ? (
            <Text
              textOverflow='ellipsis'
              overflowX='hidden'
              whiteSpace='nowrap'
              fontSize='md'
            >
              {selected[labelKey as keyof typeof selected]}
            </Text>
          ) : (
            placeholder
          )}
        </Box>
      </PopoverTrigger>

      <PopoverContent borderRadius='md' mt={-1} w='full'>
        <PopoverBody p={0}>
          {options.length > 0 ? (
            options.map((option, index) => (
              <Box
                key={`option_${option.id}`}
                bgColor={
                  selected?.id === option.id ? 'blueLight' : 'transparent'
                }
                _first={{ borderTopRadius: 'md' }}
                _last={{ borderBottomRadius: 'md' }}
                _hover={{ bg: option.unavailable ? '' : 'blueLight' }}
                cursor={option.unavailable ? 'not-allowed' : 'pointer'}
                onClick={() => !option.unavailable && handleSelect(option)}
              >
                <HStack
                  py={2}
                  mx={4}
                  spacing={8}
                  borderBottom={
                    index < options.length - 1 ? '1px solid' : 'none'
                  }
                  borderBottomColor='lightGrey'
                  justifyContent='space-between'
                >
                  <Text
                    fontStyle={option.unavailable ? 'italic' : 'normal'}
                    color={option.unavailable ? 'lightgrey' : 'black'}
                  >
                    {option[labelKey as keyof typeof option]}
                  </Text>
                  {option.unavailable && (
                    <Text color='red' fontStyle='italic' fontSize='sm'>
                      {t('unavailable')}
                    </Text>
                  )}
                </HStack>
              </Box>
            ))
          ) : (
            <Box borderRadius='md' cursor='default' py={2} mx={6}>
              <Text color='grey' fontStyle='italic'>
                {emptyMessage}
              </Text>
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Select
