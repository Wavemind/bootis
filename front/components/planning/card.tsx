/**
 * The external imports
 */
import { FC, useContext } from 'react'
import { Box, Center, HStack, Text, Icon, Button } from '@chakra-ui/react'
import { BsPinMap } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'

import { ModalContext } from '../../lib/contexts'

const PlanningCard: FC = () => {
  const { t } = useTranslation('planning')

  const { openModal } = useContext(ModalContext)

  /**
   * Opens the modal to select replacement activity
   */
  const handleReplace = () => {
    openModal({})
    console.log('open the modal and choose replacement')
  }

  /**
   * Removes the selected activity
   */
  const handleRemove = () => {
    console.log('probably open a dialog to ask if user is sure')
  }

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
          bg='teal'
          py={1}
          px={2}
          color='white'
          borderTopLeftRadius='lg'
          borderBottomRightRadius='lg'
          fontSize='xs'
        >
          Activité
        </Box>
        Image
      </Center>
      <Box p={2}>
        <Text color='black' fontWeight='bold' my={2}>
          {"Bibliothèque d'art et d'archéologie"}
        </Text>
        <HStack>
          <Icon as={BsPinMap} color='black' h={4} w={4} />
          <Text color='black' fontSize='xs'>
            Promenade du Pin 5, 1204 Genève
          </Text>
        </HStack>
        <HStack my={2} spacing={2}>
          <Box bg='blue' h={22} w={22} borderRadius='sm' />
          <Box bg='blue' h={22} w={22} borderRadius='sm' />
          <Box bg='blue' h={22} w={22} borderRadius='sm' />
          <Box bg='blue' h={22} w={22} borderRadius='sm' />
        </HStack>
        <HStack justifyContent='space-between' spacing={6} mt={3}>
          <Button
            size='sm'
            color='teal'
            variant='outline'
            borderColor='teal'
            onClick={handleReplace}
          >
            {t('replace')}
          </Button>
          <Button size='sm' variant='ghost' onClick={handleRemove}>
            {t('remove')}
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}

export default PlanningCard
