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

/**
 * Type definitions
 */
import { Option, SelectProps } from '../../lib/types'

const Select: FC<SelectProps> = ({
  options,
  placeholder,
  selected,
  setSelected,
}) => {
  const { t } = useTranslation('search')
  const { onClose, isOpen, onToggle } = useDisclosure()

  /**
   * Handles the element selection event
   * @param element string
   */
  const handleSelect = (selectedElement: Option) => {
    setSelected(selectedElement.id)
    onClose()
  }

  return (
    <Popover placement='bottom-start' isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box onClick={onToggle} role='button' tabIndex={0} cursor='pointer'>
          {selected ? (
            <Text
              textOverflow='ellipsis'
              overflowX='hidden'
              whiteSpace='nowrap'
            >
              {options?.find(option => option.id === selected)?.label}
            </Text>
          ) : (
            placeholder
          )}
        </Box>
      </PopoverTrigger>

      <PopoverContent borderRadius='md' mt={-1} w='full'>
        <PopoverBody p={0}>
          {options.map((option, index) => (
            <Box
              key={`option_${option.id}`}
              bgColor={selected === option.id ? 'blueLight' : 'transparent'}
              _first={{ borderTopRadius: 'md' }}
              _last={{ borderBottomRadius: 'md' }}
              _hover={{
                bg: option.unavailable ? '' : 'blueLight',
              }}
              cursor={option.unavailable ? 'not-allowed' : 'pointer'}
              onClick={() => !option.unavailable && handleSelect(option)}
            >
              <HStack
                py={2}
                mx={4}
                spacing={8}
                borderBottom={index < options.length - 1 ? '1px solid' : 'none'}
                borderBottomColor='lightGrey'
                justifyContent='space-between'
              >
                <Text
                  color={option.unavailable ? 'grey' : 'black'}
                  fontStyle={option.unavailable ? 'italic' : 'normal'}
                >
                  {option.label}
                </Text>
                {option.unavailable && (
                  <Text fontSize='xs' color='red' fontStyle='italic'>
                    {t('unavailable')}
                  </Text>
                )}
              </HStack>
            </Box>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Select
