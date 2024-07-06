import { format, parseISO } from 'date-fns'
import { getLocale } from './getLocale'

export const stringToDate = (date, locale, dateFormat = 'dd MMM yyyy') => {
  if (!date) {
    return ''
  }
  return format(parseISO(date), dateFormat, { locale: getLocale(locale) })
}
