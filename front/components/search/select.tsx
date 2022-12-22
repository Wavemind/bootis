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
 * Type imports
 */
import { IEnumOption } from '../../lib/types'

/**
 * Type definitions
 */
type SelectProps = {
  type: string
  options: IEnumOption[] | never[]
  placeholder: string | React.ReactNode
  selected: IEnumOption
  setSelected: React.Dispatch<
    React.SetStateAction<IEnumOption | undefined | null>
  >
}

const Select: FC<SelectProps> = ({
  type,
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
  const handleSelect = (selectedElement: IEnumOption) => {
    setSelected(selectedElement)
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
              {t(`${type}.${selected.name}`, { ns: 'common' })}
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
              bgColor={selected?.id === option.id ? 'blueLight' : 'transparent'}
              _first={{ borderTopRadius: 'md' }}
              _last={{ borderBottomRadius: 'md' }}
              _hover={{ bg: 'blueLight' }}
              cursor='pointer'
              onClick={() => handleSelect(option)}
            >
              <HStack
                py={2}
                mx={4}
                spacing={8}
                borderBottom={index < options.length - 1 ? '1px solid' : 'none'}
                borderBottomColor='lightGrey'
                justifyContent='space-between'
              >
                <Text color='black' fontStyle='normal'>
                  {t(`${type}.${option.name}`, { ns: 'common' })}
                </Text>
              </HStack>
            </Box>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Select
