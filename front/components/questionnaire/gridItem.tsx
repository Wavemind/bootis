/**
 * The external imports
 */
import { FC } from 'react'
import { GridItem as ChakraGridItem, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

/**
 * Type imports
 */
import { IChildren } from '../../lib/types'

/**
 * Type definitions
 */
interface IGridItemProps extends IChildren {
  bg: string
  handleClick: () => void
}

const GridItem: FC<IGridItemProps> = ({ bg, handleClick, children }) => (
  <Box borderRadius='xl' position='relative'>
    <ChakraGridItem
      as={motion.div}
      bg={bg}
      borderRadius='xl'
      p={4}
      color='white'
      cursor='pointer'
      h='full'
      onClick={handleClick}
      whileHover={{
        transform: 'translate(-10px, -10px)',
        transition: { duration: 0.5, type: 'spring', damping: 7 },
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

export default GridItem
