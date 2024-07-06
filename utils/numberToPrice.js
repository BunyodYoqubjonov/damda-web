import { common } from '../locales/common'

export const numberToPrice = (number, locale) => {
  return `${number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${
    common[locale]?.soum
  }`
}
