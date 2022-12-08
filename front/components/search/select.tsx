/**
 * The external imports
 */
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
} from '@chakra-ui/react'

const Select = ({ options, placeholder, selected, setSelected }) => {
  const { onClose, isOpen, onToggle } = useDisclosure()

  /**
   * Handles the element selection event
   * @param element string
   */
  const handleSelect = selectedElement => {
    setSelected(selectedElement)
    onClose()
  }

  return (
    <Popover placement='bottom-start' isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box onClick={onToggle} role='button' tabIndex={0} cursor='pointer'>
          {selected.length > 0 ? selected : placeholder}
        </Box>
      </PopoverTrigger>

      <PopoverContent borderBottomRadius='md' borderTopRadius='md' mt={-1}>
        <PopoverBody p={0}>
          {options.map((option, index) => (
            <Box
              key={option}
              bgColor={selected === option && 'blueLight'}
              _first={{ borderTopRadius: 'md' }}
              _last={{ borderBottomRadius: 'md' }}
              _hover={{
                bg: 'blueLight',
              }}
              cursor='pointer'
              onClick={() => handleSelect(option)}
            >
              <Box
                py={2}
                mx={4}
                borderBottom={index < options.length - 1 ? '1px solid' : 'none'}
                borderBottomColor='lightGrey'
              >
                {option}
              </Box>
            </Box>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Select
