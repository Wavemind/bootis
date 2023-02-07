/**
 * The external imports
 */
import { FC } from 'react'
import Image from 'next/image'
import { Box, HStack, Icon, VStack, Text } from '@chakra-ui/react'
import { MdOutlineLocationOn } from 'react-icons/md'

/**
 * Types imports
 */
import { ISlot } from '../../../lib/types'

/**
 * Type definitions
 */
interface IElementCardProps {
  place: ISlot
  handleSelection: (place: ISlot) => void
}

const ElementCard: FC<IElementCardProps> = ({ place, handleSelection }) => (
  <Box
    flexBasis='24%'
    role='button'
    h='fit-content'
    boxShadow='xl'
    borderRadius='lg'
    borderTopStyle='solid'
    borderTopColor={place.type === 'restaurant' ? 'salmon' : 'teal'}
    borderTopWidth={12}
    onClick={() => handleSelection(place)}
  >
    <Box
      h={194}
      bg='grey'
      borderBottomRadius='lg'
      backgroundImage={
        place.pictureUrl ||
        'https://via.placeholder.com/316x75.png?text=Image+non+disponible'
      }
      backgroundSize='cover'
      backgroundPosition='center center'
    />
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

export default ElementCard
