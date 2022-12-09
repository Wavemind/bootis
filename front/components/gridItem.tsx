/**
 * The external imports
 */
import { GridItem as ChakraGridItem, Box } from '@chakra-ui/react'

/**
 * Type definitions
 */
interface GridItemProps {
  bg: string
  handleClick: () => void
  children: React.ReactNode
}

const GridItem = (props: GridItemProps) => {
  const { bg, handleClick, children } = props
  return (
    <Box
      borderRadius='xl'
      _hover={{
        border: '3px solid',
        borderColor: bg,
      }}
    >
      <ChakraGridItem
        bg={bg}
        borderRadius='xl'
        p={4}
        h='full'
        color='white'
        cursor='pointer'
        onClick={handleClick}
        _hover={{
          transform: 'translate(-10px, -10px)',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        {children}
      </ChakraGridItem>
    </Box>
  )
}

export default GridItem
