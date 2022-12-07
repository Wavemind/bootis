/**
 * The external imports
 */
import { extendTheme } from '@chakra-ui/react'

/**
 * The internal imports
 */
import colors from './foundations/colors'
import fontSizes from './foundations/fontSizes'
import config from './foundations/config'
import heading from './overrides/heading'

export default extendTheme(colors, fontSizes, config, heading)
