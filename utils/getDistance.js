import { common2 } from 'locales/common2'

export const getDistance = (distance = 599, locale) => {
  if (!distance) {
    return `0 ${common2[locale].km}`
  }
  if (distance / 1000 >= 1) {
    return `${parseFloat(distance / 1000)} ${common2[locale].km}`
  }
  return `${distance} ${common2[locale].m}`
}
