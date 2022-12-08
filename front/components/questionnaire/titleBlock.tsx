/**
 * The external imports
 */
import { useContext, useMemo } from 'react'
import { HStack, Box, Heading, CircularProgress } from '@chakra-ui/react'
import { QuestionnaireContext } from '../../lib/contexts'

/**
 * Type definitions
 */
interface TitleBlockProps {
  title: string
  subtitle: string
}

const TitleBlock = (props: TitleBlockProps) => {
  const { title, subtitle } = props

  const { step } = useContext(QuestionnaireContext)

  // TODO : Correct total number of steps when known
  const progress = useMemo(() => (step * 100) / 21, [step])

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
