/**
 * The external imports
 */
import { extendTheme } from '@chakra-ui/react'
import { CalendarDefaultTheme } from '@uselessdev/datepicker'

/**
 * The internal imports
 */
import colors from './foundations/colors'
import fontSizes from './foundations/fontSizes'
import config from './foundations/config'
import fonts from './foundations/fonts'
import heading from './overrides/heading'
import button from './overrides/button'
import calendar from './overrides/calendar'

export default extendTheme(
  CalendarDefaultTheme,
  colors,
  fontSizes,
  config,
  heading,
  button,
  calendar,
  fonts
)
