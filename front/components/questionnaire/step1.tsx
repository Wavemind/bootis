/**
 * The external imports
 */
import { useContext } from 'react'
import { Grid, Text, Box, VStack, Heading, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

/**
 * The internal imports
 */
import { GridItem } from '../'
import { QuestionnaireContext } from '../../lib/contexts'
import WheelchairFemale from '../../public/wheelchair_female.svg'
import WheelchairCompanion from '../../public/wheelchair_companion.svg'
import ElectricScooter from '../../public/electric_scooter.svg'
import Cane from '../../public/cane.svg'
import Rollator from '../../public/rollator.svg'

const Step1 = () => {
  const { t } = useTranslation('questionnaire')

  const { setStep } = useContext(QuestionnaireContext)

  const handleClick = () => {
    setStep(2)
  }

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={10} mt={10}>
      <GridItem bg='blue' handleClick={handleClick}>
        <Heading variant='h2' mb={10}>
          Chaise roulante manuelle seul
        </Heading>
        <VStack spacing={4}>
          <Text fontSize='sm' zIndex={10}>
            Ut ullamcorper amet vitae augue magna facilisis consectetur
            molestie. Eget donec ultrices et cras justo, blandit amet purus vel.
            Sit quam egestas justo, suspendisse augue.
          </Text>
          <Text fontSize='sm' zIndex={10}>
            Facilisis consectetur molestie. Eget donec ultrices et cras justo,
            blandit amet purus vel. Sit quam egestas justo, suspendisse augue
            sit.
          </Text>
        </VStack>
        <Box ml={-10} mb={-6} mt={-12}>
          <Image src={WheelchairFemale} height={350} alt={t('wheelchairAlt')} />
        </Box>
      </GridItem>
      <GridItem bg='salmon' handleClick={handleClick}>
        <Heading variant='h2' mb={10}>
          Chaise roulante électrique ou chaise roulante manuelle accompagné-e.
        </Heading>
        <VStack spacing={4}>
          <Text fontSize='sm' zIndex={10}>
            Ut ullamcorper amet vitae augue magna facilisis consectetur
            molestie. Eget donec ultrices et cras justo, blandit amet purus vel.
            Sit quam egestas justo, suspendisse augue.
          </Text>
          <Text fontSize='sm' zIndex={10}>
            Facilisis consectetur molestie. Eget donec ultrices et cras justo,
            blandit amet purus vel. Sit quam egestas justo, suspendisse augue
            sit.
          </Text>
        </VStack>
        <Box ml={-7} mb={-6}>
          <Image
            src={WheelchairCompanion}
            height={240}
            alt={t('wheelchairAlt')}
          />
        </Box>
      </GridItem>
      <GridItem bg='teal' handleClick={handleClick}>
        <Heading variant='h2' mb={10}>
          Scooter électrique
        </Heading>
        <VStack spacing={4}>
          <Text fontSize='sm' zIndex={10}>
            Ut ullamcorper amet vitae augue magna facilisis consectetur
            molestie. Eget donec ultrices et cras justo, blandit amet purus vel.
            Sit quam egestas justo, suspendisse augue.
          </Text>
          <Text fontSize='sm' zIndex={10}>
            Facilisis consectetur molestie. Eget donec ultrices et cras justo,
            blandit amet purus vel. Sit quam egestas justo, suspendisse augue
            sit.
          </Text>
        </VStack>
        <VStack mb={-6}>
          <Image src={ElectricScooter} height={300} alt={t('wheelchairAlt')} />
        </VStack>
      </GridItem>
      <GridItem bg='beige' handleClick={handleClick}>
        <Heading variant='h2' mb={10}>
          Béquilles ou Rollator ou Cannes
        </Heading>
        <VStack spacing={4}>
          <Text fontSize='sm' zIndex={10}>
            Ut ullamcorper amet vitae augue magna facilisis consectetur
            molestie. Eget donec ultrices et cras justo, blandit amet purus vel.
            Sit quam egestas justo, suspendisse augue.
          </Text>
          <Text fontSize='sm' zIndex={10}>
            Facilisis consectetur molestie. Eget donec ultrices et cras justo,
            blandit amet purus vel. Sit quam egestas justo, suspendisse augue
            sit.
          </Text>
        </VStack>
        <Flex mb={-6} justifyContent='space-between'>
          <Box ml={-5} mb={-6}>
            <Image src={Cane} height={280} alt={t('wheelchairAlt')} />
          </Box>
          <Box mr={-5} mb={-6}>
            <Image src={Rollator} height={290} alt={t('wheelchairAlt')} />
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Step1
