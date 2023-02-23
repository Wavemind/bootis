/**
 * The external imports
 */
import { FC, useEffect, useState } from 'react'
import AnimatedText from 'react-animated-text-content'
import { Box, Heading } from '@chakra-ui/react'
/**
 * Type definitions
 */
type LoadingTextProps = {
  timer: number
  text: string
}

const LoadingText: FC<LoadingTextProps> = ({ timer, text }) => {
  const [isShown, setIsShown] = useState(false)
  console.log('timer', timer)
  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setIsShown(true)
    }, timer)
    return () => clearTimeout(firstTimer)
  }, [])

  return isShown ? (
    <Box h={10}>
      <Heading variant={'h1'}>
        <AnimatedText
          type='chars'
          animation={{
            x: '0',
            y: '0',
            scale: 1.0,
            ease: ' step-end',
          }}
          interval={0}
          duration={0}
          tag='h2'
          className='chakra-heading'
        >
          {text}
        </AnimatedText>
      </Heading>
    </Box>
  ) : (
    <Box h={10} />
  )
}

export default LoadingText
