/**
 * The external imports
 */
import { FC } from 'react'
import { Box, Icon, Text, Button, HStack } from '@chakra-ui/react'
import { BsPinMap } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'

/**
 * Type imports
 */
import { ISlot } from '../../lib/types'

/**
 * Type definitions
 */
interface ISlotCard {
  slot: ISlot
  index?: number
  isReduced?: boolean
  handleRemove?: (index: number) => void
  handleReplace?: (index: number) => void
}

const SlotCard: FC<ISlotCard> = ({
  slot,
  index = -1,
  isReduced = false,
  handleRemove = index => index,
  handleReplace = index => index,
}) => {
  const { t } = useTranslation('planning')

  return (
    <Box
      w={316}
      borderRadius={isReduced ? 'xl' : 'lg'}
      bg='white'
      boxShadow='lg'
      border={isReduced && slot.selected ? '4px solid' : 'none'}
      borderColor={isReduced && slot.type === 'activity' ? 'teal' : 'salmon'}
    >
      <Box
        h={75}
        bg='grey'
        borderRadius='lg'
        color='black'
        position='relative'
        backgroundImage={
          slot.pictureUrl ||
          'https://via.placeholder.com/316x75.png?text=Image+non+disponible'
        }
        backgroundSize='cover'
        backgroundPosition='center center'
      >
        <Box
          position='absolute'
          top={0}
          left={0}
          bg={slot.type === 'activity' ? 'teal' : 'salmon'}
          py={1}
          px={2}
          color='white'
          borderTopLeftRadius='lg'
          borderBottomRightRadius='lg'
          fontSize='xs'
        >
          {t(slot.type)}
        </Box>
      </Box>
      <Box p={2}>
        <Text color='black' fontWeight='bold' my={2} noOfLines={1}>
          {slot.name}
        </Text>
        <HStack>
          <Icon as={BsPinMap} color='black' h={4} w={4} />
          <Text color='black' fontSize='xs' noOfLines={1}>
            {slot.fullAddress}
          </Text>
        </HStack>
        {!isReduced && (
          <Box>
            <HStack justifyContent='space-between' spacing={6} mt={3}>
              <Button
                size='sm'
                color={slot.type === 'activity' ? 'teal' : 'salmon'}
                variant='outline'
                borderColor={slot.type === 'activity' ? 'teal' : 'salmon'}
                onClick={() => handleReplace(index)}
              >
                {t('replace')}
              </Button>
              <Button
                size='sm'
                variant='ghost'
                onClick={() => handleRemove(index)}
              >
                {t('remove')}
              </Button>
            </HStack>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SlotCard
