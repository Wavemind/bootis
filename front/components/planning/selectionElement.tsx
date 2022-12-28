/**
 * The external imports
 */
import { FC } from 'react'
import Image from 'next/image'
import { Box, HStack, Icon, VStack, Text, Center } from '@chakra-ui/react'
import { MdOutlineLocationOn } from 'react-icons/md'

/**
 * Types imports
 */
import { ISlot } from '../../lib/types'

const SelectionElement: FC<{ place: ISlot }> = ({ place }) => {
  /**
   * Handles the new element selection
   */
  const handleSelection = () => {
    console.log('replace the selected slot with the selected new element')
  }

  return (
    <Box
      flexBasis={280}
      role='button'
      h='fit-content'
      boxShadow='xl'
      borderRadius='lg'
      borderTopStyle='solid'
      borderTopColor={
        place.category?.section === 'restaurant' ? 'salmon' : 'teal'
      }
      borderTopWidth={12}
      onClick={handleSelection}
    >
      <Center h={194} bg='grey' borderBottomRadius='lg'>
        Image
      </Center>
      <VStack alignItems='flex-start' p={2} pb={4} spacing={3}>
        <Text
          fontSize='xl'
          fontFamily='Noir Pro Medium, sans-serif'
          noOfLines={1}
        >
          {place.name}
        </Text>
        <HStack>
          <Icon as={MdOutlineLocationOn} h={7} w={7} />
          <Text fontSize='sm' w='80%' lineHeight={1.2}>
            {place.fullAddress}
          </Text>
        </HStack>
        <HStack my={2} spacing={2}>
          {place.pictograms?.map(pictogram => (
            <Image
              key={`pictogram_${place.id}_${pictogram.name}`}
              alt={pictogram.name}
              src={pictogram.linkSvg}
              height={22}
              width={22}
            />
          ))}
        </HStack>
      </VStack>
    </Box>
  )
}

export default SelectionElement
