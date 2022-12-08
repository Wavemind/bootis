/**
 * The external imports
 */
import { GridItem as ChakraGridItem } from '@chakra-ui/react'

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
    <ChakraGridItem
      bg={bg}
      borderRadius='xl'
      p={4}
      color='white'
      cursor='pointer'
      onClick={handleClick}
      _hover={{
        transform: 'translate(-10px, -10px)',
      }}
    >
      {children}
    </ChakraGridItem>
  )
}

export default GridItem
