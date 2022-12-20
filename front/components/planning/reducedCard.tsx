/**
 * The external imports
 */
import { FC } from 'react'
import { Box, Center, HStack, Text, Icon } from '@chakra-ui/react'
import { BsPinMap } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'

/**
 * Type definitions
 */
import { SlotType } from '../../lib/types'

const PlanningCard: FC<{ slot?: SlotType }> = ({ slot }) => {
  const { t } = useTranslation('planning')

  return (
    <Box
      w={316}
      borderRadius='xl'
      bg='white'
      boxShadow='lg'
      border={slot?.selected ? '4px solid' : 'none'}
      borderColor={slot?.type === 'activity' ? 'teal' : 'salmon'}
    >
      <Center
        h={75}
        bg='grey'
        borderRadius='lg'
        color='black'
        position='relative'
      >
        <Box
          position='absolute'
          top={0}
          left={0}
          bg={slot?.type === 'activity' ? 'teal' : 'salmon'}
          py={1}
          px={2}
          color='white'
          borderTopLeftRadius='lg'
          borderBottomRightRadius='lg'
          fontSize='xs'
        >
          {t(slot?.type)}
        </Box>
        Image
      </Center>
      <Box p={2}>
        <Text color='black' fontWeight='bold' my={2}>
          {slot?.label}
        </Text>
        <HStack>
          <Icon as={BsPinMap} color='black' h={4} w={4} />
          <Text color='black' fontSize='xs'>
            {slot?.address}
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default PlanningCard
