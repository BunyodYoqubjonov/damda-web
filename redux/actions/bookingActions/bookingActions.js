import { BookingActionTypes } from './bookingActionTypes'

export const setBookingItems = (payload) => {
  return {
    type: BookingActionTypes.SET_BOOKING_ITEMS,
    payload,
  }
}

export const addToRooms = (payload) => {
  return {
    type: BookingActionTypes.ADD_TO_ROOM,
    payload,
  }
}

export const removeToRooms = (payload) => {
  return {
    type: BookingActionTypes.REMOVE_TO_ROOM,
    payload,
  }
}

export const setBreakfast = (payload) => {
  return {
    type: BookingActionTypes.SET_IS_BREAKFAST,
    payload,
  }
}

export const setBreakfastPrice = (payload) => {
  return {
    type: BookingActionTypes.SET_BREAKFAST_PRICE,
    payload,
  }
}

export const setIsResident = (payload) => {
  return {
    type: BookingActionTypes.SET_IS_RESIDENT,
    payload,
  }
}

export const incrementAdult = (payload) => {
  return {
    type: BookingActionTypes.ADD_ADULT,
    payload,
  }
}

export const incrementChildren = (payload) => {
  return {
    type: BookingActionTypes.ADD_CHILDREN,
    payload,
  }
}

export const decrementAdult = (payload) => {
  return {
    type: BookingActionTypes.REDUCE_ADULT,
    payload,
  }
}

export const decrementChildren = (payload) => {
  return {
    type: BookingActionTypes.REDUCE_CHILDREN,
    payload,
  }
}
export const bookingDate = (payload) => {
  return {
    type: BookingActionTypes.BOOKINGS_DATE,
    payload,
  }
}
export const clearBookingRooms = (payload) => {
  return {
    type: BookingActionTypes.CLEAR_BOOKING,
    payload,
  }
}
export const setPickupFromAirport = (payload) => {
  return {
    type: BookingActionTypes.SET_PICKUP_FROM_AIRPORT,
    payload,
  }
}
export const setAirport = (payload) => {
  return {
    type: BookingActionTypes.SET_AIRPORT,
    payload,
  }
}
