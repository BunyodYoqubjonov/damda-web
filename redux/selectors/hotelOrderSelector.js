export const getBookingRooms = (state) =>
  state.booking.bookingRooms.filter((item) => item.cartQuantity)

export const totalPriceSelector = (state) =>
  state.booking.bookingRooms.reduce((acc, item) => acc + item.totalPrice, 0)
