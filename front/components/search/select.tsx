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
  useConst,
} from '@chakra-ui/react'

const Select = ({ placeholder, selected, setSelected }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  /**
   * Handles the element selection event
   * @param element string
   */
  const handleSelect = selectedElement => {
    setSelected(selectedElement)
    onClose()
  }

  // TODO : Get this from backend I'm guessing ?
  const regions = useConst(() => [
    'Grisons',
    'Suisse orientiale',
    'Région zurichoise',
    'Lucerne / Lac des Quarte-Cantons',
    'Région bâloise',
    'Région Berne',
    'Jura & Trois-Lacs',
    'Vaud',
    'Genève',
    'Valaise',
    'Tessin',
    'Région Fribourg',
    'Région Argovie et Soleure',
  ])

  return (
    <Popover placement='bottom-start' isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box onClick={onOpen} cursor='pointer'>
          {selected.length > 0 ? selected : placeholder}
        </Box>
      </PopoverTrigger>

      <PopoverContent borderBottomRadius='md' borderTopRadius='md' mt={-1}>
        <PopoverBody p={0}>
          {regions.map((region, index) => (
            <Box
              key={region}
              bgColor={selected === region && 'primaryLight'}
              _first={{ borderTopRadius: 'md' }}
              _last={{ borderBottomRadius: 'md' }}
              _hover={{
                bg: 'primaryLight',
              }}
              cursor='pointer'
              onClick={() => handleSelect(region)}
            >
              <Box
                py={2}
                mx={4}
                borderBottom={index < regions.length - 1 ? '1px solid' : 'none'}
                borderBottomColor='lightGrey'
              >
                {region}
              </Box>
            </Box>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Select
