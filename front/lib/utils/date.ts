/**
 * The external imports
 */
import format from 'date-fns/format'
import fr from 'date-fns/locale/fr'

/**
 * Formats the date into dd.MM.yyyy format
 * @param date date or string
 * @returns string
 */
export const formatDate = (
  date: Date | string,
  formatString = 'dd.MM.yyyy'
) => {
  if (date instanceof Date) {
    return format(date, formatString, { locale: fr })
  }
  return format(new Date(date), formatString, { locale: fr })
}
