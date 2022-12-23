/**
 * The external imports
 */
import { FC } from 'react'
import { Box, Icon, Text, Button, Center, HStack } from '@chakra-ui/react'
import { BsPinMap } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'
import { ISlot } from '../../lib/types'

interface ISlotCard {
  slot: ISlot
  index: number
  isReduced?: boolean
  handleRemove: (index: number) => void
  handleReplace: (index: number) => void
}

const SlotCard: FC<ISlotCard> = ({
  slot,
  index,
  isReduced = false,
  handleRemove,
  handleReplace,
}) => {
  const { t } = useTranslation('planning')

  return (
    <Box w={316} borderRadius='lg' bg='white' boxShadow='lg'>
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
        Image
      </Center>
      <Box p={2}>
        <Text color='black' fontWeight='bold' my={2}>
          {slot.label}
        </Text>
        <HStack>
          <Icon as={BsPinMap} color='black' h={4} w={4} />
          <Text color='black' fontSize='xs' noOfLines={1}>
            {slot.address}
          </Text>
        </HStack>
        {!isReduced && (
          <Box>
            <HStack my={2} spacing={2}>
              {slot.signs.map((sign: string) => (
                <Box key={sign} bg='blue' h={22} w={22} borderRadius='sm' />
              ))}
            </HStack>
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
