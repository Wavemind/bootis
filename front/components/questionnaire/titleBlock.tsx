/**
 * The external imports
 */
import { FC, useContext, useMemo } from 'react'
import { HStack, Box, Heading, CircularProgress } from '@chakra-ui/react'

/**
 * The internal imports
 */
import { QuestionnaireContext } from '../../lib/contexts'

/**
 * Type definitions
 */
import { TitleBlockProps } from '../../lib/types'

const TitleBlock: FC<TitleBlockProps> = ({ title, subtitle }) => {
  const { currentStep, steps } = useContext(QuestionnaireContext)

  const progress = useMemo(
    () => (currentStep * 100) / steps.length,
    [currentStep, steps]
  )

  return (
    <HStack justifyContent='space-between'>
      <Box>
        <Heading variant='h1'>{title}</Heading>
        <Heading variant='h3'>{subtitle}</Heading>
      </Box>
      <CircularProgress value={progress} size='100px' color='salmon' />
    </HStack>
  )
}

export default TitleBlock
