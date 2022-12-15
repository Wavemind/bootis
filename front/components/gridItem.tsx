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
    <Box borderRadius='xl' position='relative'>
      <ChakraGridItem
        bg={bg}
        borderRadius='xl'
        p={4}
        color='white'
        cursor='pointer'
        h='full'
        onClick={handleClick}
        transition='0.5s ease-in-out'
        _hover={{
          transform: 'translate(-10px, -10px)',
        }}
      >
        {children}
      </ChakraGridItem>
      <Box
        zIndex={-1}
        w='full'
        border='3px solid'
        borderRadius='xl'
        borderColor={bg}
        position='absolute'
        top={0}
        bottom={0}
      />
    </Box>
  )
}

export default GridItem
