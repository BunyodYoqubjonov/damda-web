import { ru, uz, uzCyrl, enUS } from 'date-fns/locale'

export const getLocale = (key) => {
  switch (key) {
    case 'uz':
      return uz
    case 'ru':
      return ru
    case 'uzk':
      return uzCyrl

    default:
      return enUS
  }
}
