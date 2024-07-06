export const orderBusinessDaysPriceSelector = (state) => {
  const { businessDays, price } = state.order.order
  return businessDays * price
}

export const orderHolidaysPriceSelector = (state) => {
  const { holidays, holidayPrice } = state.order.order
  return holidays * holidayPrice
}

export const orderTotalPriceSelector = (state) => {
  const { holidays, holidayPrice, businessDays, price } = state.order.order
  return holidays * holidayPrice + businessDays * price
}