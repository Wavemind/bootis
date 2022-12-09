/**
 * The external imports
 */
import { useContext, useMemo } from 'react'
import { HStack, Box, Heading, CircularProgress } from '@chakra-ui/react'

/**
 * The internal imports
 */
import { QuestionnaireContext } from '../../lib/contexts'

/**
 * Type definitions
 */
interface TitleBlockProps {
  title: string
  subtitle: string
  totalSteps: number
}

const TitleBlock = (props: TitleBlockProps) => {
  const { title, subtitle, totalSteps } = props

  const { currentStep } = useContext(QuestionnaireContext)

  const progress = useMemo(
    () => (currentStep * 100) / totalSteps,
    [currentStep]
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
